// Fonction pour afficher la date actuelle
function displayCurrentDate() {
    const now = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const dateString = now.toLocaleDateString("fr-FR", options)
    document.getElementById("current-date").textContent = dateString
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    // Afficher la date
    displayCurrentDate()

    // Activer tous les tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

    // Activer tous les popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
})
