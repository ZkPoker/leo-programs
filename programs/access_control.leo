program access_control.aleo {
    // We cap the maximum number of players per table at 10
    const MAX_PLAYERS: u8 = 10u8;

    // Representation of a card
    struct Card {
        // 0 - Heart, 1 - Diamond, 2 - Spade, 3 - Claver
        suit: u8,
        // [1, 14] where 1 represents Ace. Follows sequentially.
        // value zero represents un-dealt community card
        card_value: u8,
    }

    struct EncryptedCard {
        c0: group,
        c1: group,
    }

    struct ShuffleEncryptParams {
        agg_pk: group,
        // This is the all but the player's encryption
        enc_cards1: [EncryptedCard; 32],
        enc_cards2: [EncryptedCard; 20],
        perm_matrix1: [[u8; 32]; 32],
        perm_matrix2: [[u8; 20]; 20],
        random_vector1: [scalar; 32],
        random_vector2: [scalar; 20],
        // output of player's re-encryption
        player_encryption1: [EncryptedCard; 32],
        player_encryption2: [EncryptedCard; 20],
    }

    record ApplyEncryptShuffle {
        owner: address,
        params: ShuffleEncryptParams,
        player_index: u8,
    }

    function elgamal_encryption(m0: group, m1: group, r: scalar, pk: group) -> EncryptedCard {
        let c0: group = m0 + r * group::GEN;
        let c1: group = m1 + r * pk;
        let enc: EncryptedCard = EncryptedCard {
            c0,
            c1
        };

        return enc;
    }


    transition veify_encrypted_shuffle(params: ShuffleEncryptParams) {
        let other_enc: EncryptedCard = params.enc_cards1[0u8];
        let card: EncryptedCard = elgamal_encryption(other_enc.c0, other_enc.c1, params.random_vector1[0u8], params.agg_pk);
    }

    // Mapping of table identifier with table state
    mapping Table: field => GameState;
    
    // Mapping of table id with the players
    // we allow a max 10 players per table
    mapping Players: field => [Player; 10];

    // Mapping of table id with the mainpot identifier.
    mapping TableMainPotId: field => field;

    // Mapping of mainpot id with mainpot info
    mapping TableMainPot: field => field;

    // round id = hash(table_id | round )
    mapping RoundId: field => PlayerStatus;

    // 0 - fold
    // 1 - active
    // 2 - All-in
    struct PlayerStatus {
        status: u8,
    }
    record HoleCard {
        owner: address,
        card: Card,
    }

    record AuthState {
        owner: address,
        nonce: u128,
    }

    struct GameState {
        // Community cards 
        public_cards: [Card; 5],
        // 0 - first round, 1 - flip, 2 - turn, 3 - river
        round: u8,
        players: [Player; 10],
        small_blind: u64,
        big_blind: u64,
        min_buy_in: u64,
        max_buy_in: u64,
        //mainpot: MainPot,
        //sidepot: SidePot,
        //pre_flop: PreFlopRound,
        //Flop: FlopRound,
        //turn: TurnRound,
        //river: RiverRound,
        current_turn: u8,

        // this is provided during start_game to create an unique identifier
        game_seed: u128,
    }

    struct Player {
        // this is derived from a secret that the player only knows.
        // it yields two purposes
        //  - unique identifier
        //  - player must provide the secret during every plays 
        //    and its hash is checked against id to authorize the play.
        id: field,
        addr: address,
        // chip is a 1:1 mapping with aleo credits
        // chips: u128,
    }

    
    /*struct SidePot {
    }

    struct MainPot {}

    struct PreFlopRound {}

    struct FlopRound {}

    struct TurnRound {}

    struct RiverRound {}

    transition verify_action(
        private auth: AuthState,
        public action: field,  // e.g., "bet", "fold"
        public action_params: ActionParams, // TODO: Implement Action types
        signature: signature
    ) -> AuthState {
        // Verify the signature
        let signable = BHP256::hash_to_field(action, action_params, auth.nonce);
        assert(signature.verify(auth.owner, signable));

        // Increment nonce to prevent replay
        let updated_auth = AuthState {
            owner: auth.owner,
            nonce: auth.nonce + 1u128
        };

        return updated_auth;
    }
    
    struct AllInNotification {

    }

    struct CallNotification {

    }

    struct RaiseNotification {

    }

    struct FoldNotification {

    }

    struct SidePotCreateNotification {

    }


    // Can be used by frontend to create
    struct MainPotCreateNotification {

    }
    */

    async transition start_game(max_players: u8, small_blind: u64, big_blind: u64, min_buy_in: u64, max_buy_in: u64, player_address: address, player_secret: u128, game_seed: u128) -> (field, Future) {
        let card: Card = Card {
            suit: 0u8,
            card_value: 0u8,
        };

        let player_id: field = BHP256::hash_to_field(player_secret);

        let player: Player = Player {
            id: player_id,
            addr: player_address,
        };

        // random address from leo documentation
        let random_address: address = aleo1ezamst4pjgj9zfxqq0fwfj8a4cjuqndmasgata3hggzqygggnyfq6kmyd4;

        let default_player: Player = Player {
            id: 0field,
            addr: random_address,
        };

        let public_cards: [Card; 5] = [card, card, card, card, card];
        let players: [Player; 10] = [player, default_player, default_player, default_player, default_player, default_player, default_player, default_player, default_player, default_player];

        let game: GameState = GameState {
                public_cards,
                round: 0u8,
                players,
                small_blind,
                big_blind,
                min_buy_in,
                max_buy_in,
                //mainpot: MainPot,
                //sidepot: SidePot,
                //pre_flop: PreFlopRound,
                //Flop: FlopRound,
                //turn: TurnRound,
                //river: RiverRound,
                current_turn: 0u8,
                game_seed
        };

        let game_id: field = BHP256::hash_to_field(game);
        return (game_id, finalize_start_game(game_id, game));
    }

    async function finalize_start_game(game_id: field, game: GameState) {
        Table.set(game_id, game);
    }

    // this must be used whenever the player accesses or updates the game state.
    // and the nonce must be incremented to prevent reusing the signatures.
    transition authenticate(sig: signature, addr: address, signable: AuthState) {
        assert(sig.verify(addr, signable.nonce));
    }
}