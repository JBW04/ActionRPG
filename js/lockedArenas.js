document.addEventListener("DOMContentLoaded", function () {
    let playerLevel = 4; // Example: Replace with actual player level from storage or backend

    function unlockArena(id, requiredLevel, link) {
        let arenaElement = document.getElementById(id);
        if (!arenaElement) return; // Safety check

        if (playerLevel >= requiredLevel) {
            arenaElement.classList.remove("locked"); // Remove locked style

            // Change lock text color
            const lockText = arenaElement.querySelector(".lock-text");
            if (lockText) lockText.style.color = "white";

            // Make it clickable by wrapping it in an anchor tag
            let wrapper = document.createElement("a");
            wrapper.href = link;
            wrapper.className = arenaElement.className; // Preserve styles
            wrapper.innerHTML = arenaElement.innerHTML;

            // Replace div with new <a> tag
            arenaElement.replaceWith(wrapper);
        } else {
            // Prevent clicking by disabling pointer events
            arenaElement.style.pointerEvents = "none";
            arenaElement.style.opacity = "0.5"; // Optional: Make locked arenas look more faded
        }
    }

    unlockArena("small-arena", 5, "/fighting/small.html");
    unlockArena("crystal-arena", 10, "/fighting/crystal.html");
    unlockArena("lava-arena", 15, "/fighting/lava.html");
});
