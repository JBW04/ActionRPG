let playerHealth = 100;
let enemyHealth = 0;
let currentEnemy = null;

const enemies = [
    //{name: "", health: 30, attack: 5, img: ""}
    {name: "Skeleton", health: 50, attack: 6, img: "/imgs/characters/skeleton.png"},
    {name: "Zombie", health: 70, attack: 10, img: "/imgs/characters/zombie.png"}
]

// Function to spawn an enemy
function spawnEnemy() {
    currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    enemyHealth = currentEnemy.health;

    document.getElementById("enemy-name").textContent = currentEnemy.name;
    document.getElementById('enemy-img').src = currentEnemy.img;
    document.getElementById('enemy-img').style.display = "block";
    document.getElementById('enemy-health').textContent = enemyHealth;
    document.getElementById('enemy-health-bar').value = enemyHealth;
    document.getElementById("enemy-health-bar").max = currentEnemy.health;

    logFight(`A wild ${currentEnemy.name} appears!`);
}

// Function to attack the enemy
function attackEnemy() {
    if (!currentEnemy) {
        spawnEnemy();
        return;
    }

    let playerDamage = Math.floor(Math.random() * 15) + 5;
    let enemyDamage = currentEnemy.attack;

    enemyHealth -= playerDamage;
    document.getElementById("enemy-health").textContent = Math.max(0, enemyHealth);
    document.getElementById("enemy-health-bar").value = Math.max(0, enemyHealth);
    
    if (enemyHealth <= 0){
        logFight(`You defated the ${currentEnemy.name}!`);
        currentEnemy = null;
        document.getElementById("enemy-img").style.display = "none";
        spawnEnemy();
    }

    // Enemy counter attacks
    playerHealth -= enemyDamage;
    document.getElementById("player-health").textContent = Math.max(0, playerHealth);
    document.getElementById("player-health-bar").value = Math.max(0, playerHealth);
    logFight(`The ${currentEnemy.name} attacks you for ${enemyDamage} damage`);

    if (playerHealth <= 0){
        logFight("You have been defeated!");
        document.querySelector(".fight-button").disabled = true;
    }
}

function logFight(message) {
    let log = document.getElementById("fight-log");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

spawnEnemy()