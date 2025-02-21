program access_control.aleo;

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

struct PlayerStatus:
    status as u8;

record AuthState:
    owner as address.private;
    nonce as u128.private;

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

mapping Table:
    key as field.public;
    value as GameState.public;

mapping Players:
    key as field.public;
    value as [Player; 10u32].public;

mapping TableMainPotId:
    key as field.public;
    value as field.public;

mapping TableMainPot:
    key as field.public;
    value as field.public;

mapping RoundId:
    key as field.public;
    value as PlayerStatus.public;

closure elgamal_encryption:
    input r0 as group;
    input r1 as group;
    input r2 as scalar;
    input r3 as group;
    mul r2 group::GEN into r4;
    add r0 r4 into r5;
    mul r2 r3 into r6;
    add r1 r6 into r7;
    cast r5 r7 into r8 as EncryptedCard;
    output r8 as EncryptedCard;

function veify_encrypted_shuffle:
    input r0 as ShuffleEncryptParams.private;
    call elgamal_encryption r0.enc_cards1[0u32].c0 r0.enc_cards1[0u32].c1 r0.random_vector1[0u32] r0.agg_pk into r1;

function start_game:
    input r0 as u8.private;
    input r1 as u64.private;
    input r2 as u64.private;
    input r3 as u64.private;
    input r4 as u64.private;
    input r5 as address.private;
    input r6 as u128.private;
    input r7 as u128.private;
    cast 0u8 0u8 into r8 as Card;
    hash.bhp256 r6 into r9 as field;
    cast r9 r5 into r10 as Player;
    cast 0field aleo1ezamst4pjgj9zfxqq0fwfj8a4cjuqndmasgata3hggzqygggnyfq6kmyd4 into r11 as Player;
    cast  r8 r8 r8 r8 r8 into r12 as [Card; 5u32];
    cast  r10 r11 r11 r11 r11 r11 r11 r11 r11 r11 into r13 as [Player; 10u32];
    cast r12 0u8 r13 r1 r2 r3 r4 0u8 r7 into r14 as GameState;
    hash.bhp256 r14 into r15 as field;
    async start_game r15 r14 into r16;
    output r15 as field.private;
    output r16 as access_control.aleo/start_game.future;

finalize start_game:
    input r0 as field.public;
    input r1 as GameState.public;
    set r1 into Table[r0];

function authenticate:
    input r0 as signature.private;
    input r1 as address.private;
    input r2 as AuthState.record;
    sign.verify r0 r1 r2.nonce into r3;
    assert.eq r3 true;
