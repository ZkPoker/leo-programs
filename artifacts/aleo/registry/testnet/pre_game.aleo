import access_control.aleo;
program pre_game.aleo;

struct Card:
    suit as u8;
    card_value as u8;

struct EncryptedCard:
    c0 as group;
    c1 as group;

struct ShuffleEncryptParams:
    agg_pk as group;
    enc_cards1 as [EncryptedCard; 32u32];
    enc_cards2 as [EncryptedCard; 20u32];
    perm_matrix1 as [[u8; 32u32]; 32u32];
    perm_matrix2 as [[u8; 20u32]; 20u32];
    random_vector1 as [scalar; 32u32];
    random_vector2 as [scalar; 20u32];
    player_encryption1 as [EncryptedCard; 32u32];
    player_encryption2 as [EncryptedCard; 20u32];

struct Player:
    id as field;
    addr as address;

struct GameState:
    public_cards as [Card; 5u32];
    round as u8;
    players as [Player; 10u32];
    small_blind as u64;
    big_blind as u64;
    min_buy_in as u64;
    max_buy_in as u64;
    current_turn as u8;
    game_seed as u128;

function main:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
