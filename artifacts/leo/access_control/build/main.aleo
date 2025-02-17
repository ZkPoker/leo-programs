program access_control.aleo;

struct Card:
    suit as u8;
    card_value as u8;

struct PlayerStatus:
    status as u8;

record AuthState:
    owner as address.private;
    nonce as u128.private;

struct Player:
    id as field;
    add as address;
    secret_hash as field;
    chips as u128;

struct GameState:
    public_cards as [Card; 5u32];
    round as u8;
    players as [Player; 10u32];
    current_turn as u8;

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

function authenticate:
    input r0 as signature.private;
    input r1 as address.private;
    input r2 as AuthState.record;
    sign.verify r0 r1 r2.nonce into r3;
    assert.eq r3 true;
