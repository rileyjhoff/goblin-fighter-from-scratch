// import functions and grab DOM elements
import { renderGoblins } from './render-utils.js';
const defeatedGoblinsEl = document.querySelector('#defeated-goblins-count');
const playerLevelEl = document.querySelector('#player-level');
const playerHpEl = document.querySelector('#player-hp');
const goblinFormEl = document.querySelector('#goblin-form');
const goblinListEl = document.querySelector('#goblins-container');
const playerXpEl = document.querySelector('#player-xp');

// let state
let defeatedGoblinCount = 0;
let player = {
    hp: 10,
    level: 1,
    strength: 1,
    agility: 2,
    accuracy: 2,
    xp: 0
};

let goblins = [
    {
        name: 'Hogger',
        hp: 4,
        level: 1,
        strength: 1,
        agility: 1,
        accuracy: 1
    },
    {
        name: 'Hogger Jr',
        hp: 1,
        level: 1,
        strength: 1,
        agility: 1,
        accuracy: 1
    }
];

console.log(defeatedGoblinsEl, defeatedGoblinCount, goblinFormEl, goblinListEl, goblins, player, playerHpEl, playerLevelEl);

// set event listeners 
    // get user input
    // use user input to update state 
    // update DOM to reflect the new state

// Math.ceil(Math.random() * (4))

goblinFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(goblinFormEl);
    const newGoblin = {
        name: data.get('goblin-name'),
        level: Math.ceil(Math.random() * player.level)
    };
    newGoblin.hp = 3 + Math.ceil(Math.random() * newGoblin.level);
    newGoblin.strength = newGoblin.level;
    newGoblin.agility = newGoblin.level;
    newGoblin.accuracy = newGoblin.level;
    goblins.push(newGoblin);
    console.log(goblins);
    displayGoblins();
    goblinFormEl.reset();
});

function displayGoblins() {
    goblinListEl.textContent = '';
    for (let goblin of goblins) {
        const goblinDiv = renderGoblins(goblin);
        goblinDiv.addEventListener('click', () => {
            if (goblin.hp > 0) {
                hitRolls(goblin);
                if (goblin.hp === 0) {
                    alert(`You have defeated ${goblin.name}. ${1 + goblin.level}xp gained. Healed for ${goblin.level} HP`);
                    defeatedGoblinCount++;
                    defeatedGoblinsEl.textContent = defeatedGoblinCount;
                    player.hp = player.hp + goblin.level;
                    playerHpEl.textContent = player.hp;
                    player.xp = player.xp + 1 + goblin.level;
                    playerXpEl.textContent = player.xp;
                    // goblinDiv.classList.add('dead');
                }
                levelUp();
                displayGoblins();
            }
        });
        if (goblin.hp === 0) {
            goblinDiv.classList.add('defeated');
        }
        goblinListEl.append(goblinDiv);
    }
}

// function displayGoblins() {
//     goblinListEl.textContent = '';
//     for (let goblin of goblins) {
//         const goblinDiv = renderGoblins(goblin);
//         goblinDiv.addEventListener('click', () => {
//             if (goblin.hp > 0) {
//                 if (Math.random() > 0.5) {
//                     goblin.hp--;
//                 }
//                 if (Math.random() > 0.66 && goblin.hp !== 0) {
//                     player.hp--;
//                     playerHpEl.textContent = player.hp;
//                 }
//                 displayGoblins();
//                 if (goblin.hp === 0) {
//                     alert(`You have defeated ${goblin.name}. ${1 + goblin.level}xp gained.`);
//                     defeatedGoblinCount++;
//                     defeatedGoblinsEl.textContent = defeatedGoblinCount;
//                     player.xp = player.xp + 1 + goblin.level;
//                     playerXpEl.textContent = player.xp;
//                 }
//             }
//         });
//         goblinListEl.append(goblinDiv);
//     }
// }

displayGoblins();

function hitRolls(goblin) {
    playerHitRoll(goblin);
    goblinHitRoll(goblin);
}

function playerHitRoll(goblin) {
    if (Math.random() < (0.5 + ((player.accuracy - goblin.agility) / 10))) {
        let playerHit = Math.ceil(Math.random() * player.strength);
        if (playerHit > goblin.hp) {
            alert(`You hit ${goblin.name} for ${goblin.hp} damage.`);
            goblin.hp = 0;
        } else {
            goblin.hp = goblin.hp - playerHit;
            alert(`You hit ${goblin.name} for ${playerHit} damage.`);
        }
    } else {
        alert('You missed!');
    }
}

function goblinHitRoll(goblin) {
    if (Math.random() > (0.50 + ((player.agility - goblin.accuracy) / 10)) && goblin.hp !== 0) {
        let goblinHit = Math.ceil(Math.random() * goblin.strength);
        if (goblinHit > player.hp) {
            alert(`${goblin.name} hit you for ${player.hp} damage.`);
            player.hp = 0;
        } else {
            alert(`${goblin.name} hit you for ${goblinHit} damage.`);
            player.hp = player.hp - goblinHit;
        }
        playerHpEl.textContent = player.hp;
    } else if (goblin.hp !== 0) {
        alert(`${goblin.name} missed!`);
    }
}

function ifDefeated(goblin, goblinDiv) {
    if (goblin.hp === 0) {
        alert(`You have defeated ${goblin.name}. ${1 + goblin.level}xp gained. Healed for ${goblin.level} HP`);
        defeatedGoblinCount++;
        defeatedGoblinsEl.textContent = defeatedGoblinCount;
        player.hp = player.hp + goblin.level;
        playerHpEl.textContent = player.hp;
        player.xp = player.xp + 1 + goblin.level;
        playerXpEl.textContent = player.xp;
        goblinDiv.classList.add('dead');
    }
}

function levelUp() {
    if (player.xp >= 6) {
        player.level = 2;
    }
    if (player.xp >= 12) {
        player.level = 3;
    }
    if (player.xp >= 25) {
        player.level = 4;
    }
    if (player.xp >= 50) {
        player.level = 5;
    }
    if (player.xp >= 100) {
        player.level = 6;
    }
    if (player.xp >= 200) {
        player.level = 7;
    }
    if (player.xp >= 400) {
        player.level = 8;
    }
    if (player.xp >= 800) {
        player.level = 9;
    }
    if (player.xp >= 1600) {
        player.level = 10;
    }
    player.strength = player.level;
    player.accuracy = 1 + player.level;
    player.agility = 1 + player.level;
    playerLevelEl.textContent = player.level;
}