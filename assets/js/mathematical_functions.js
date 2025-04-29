    // Fonctions mathématiques
    const mathFunctions = {
    addition: (a, b) => a + b,
    soustraction: (a, b) => a - b,
    multiplication: (a, b) => a * b,
    division: (a, b) => {
    if (b === 0) throw new Error("Division par zéro impossible");
    return a / b;
},
    puissance: (a, b) => Math.pow(a, b),
    racine: (a) => {
    if (a < 0) throw new Error("La racine carrée d'un nombre négatif n'est pas définie dans les réels");
    return Math.sqrt(a);
},
    logarithme: (a) => {
    if (a <= 0) throw new Error("Le logarithme n'est défini que pour les nombres strictement positifs");
    return Math.log10(a);
},
    sinus: (a) => Math.sin(a),
    cosinus: (a) => Math.cos(a),
    tangente: (a) => Math.tan(a),
    factorielle: (a) => {
    a = Math.round(a);
    if (a < 0) throw new Error("La factorielle n'est définie que pour les entiers positifs ou nuls");
    if (a === 0 || a === 1) return 1;
    let result = 1;
    for (let i = 2; i <= a; i++) {
    result *= i;
}
    return result;
},
    pgcd: (a, b) => {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    if (a === 0 && b === 0) throw new Error("Le PGCD de 0 et 0 n'est pas défini");
    if (a === 0) return b;
    if (b === 0) return a;
    while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
}
    return a;
},
    ppcm: (a, b) => {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    if (a === 0 || b === 0) throw new Error("Le PPCM avec 0 n'est pas défini");
    return (a * b) / mathFunctions.pgcd(a, b);
}
};

    // Gestion du formulaire
    document.addEventListener('DOMContentLoaded', function() {
    const functionSelect = document.getElementById('function-select');
    const paramAContainer = document.getElementById('param-a-container');
    const paramBContainer = document.getElementById('param-b-container');
    const paramA = document.getElementById('param-a');
    const paramB = document.getElementById('param-b');
    const mathForm = document.getElementById('math-form');
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');

    // Mise à jour de l'affichage des paramètres en fonction de la fonction sélectionnée
    functionSelect.addEventListener('change', function() {
    const selectedFunction = functionSelect.value;

    // Réinitialiser les champs
    paramA.value = '';
    paramB.value = '';
    resultContainer.style.display = 'none';

    // Afficher/masquer le paramètre B selon la fonction
    if (['racine', 'logarithme', 'sinus', 'cosinus', 'tangente', 'factorielle'].includes(selectedFunction)) {
    paramBContainer.style.display = 'none';
    paramB.required = false;
} else {
    paramBContainer.style.display = 'block';
    paramB.required = true;
}

    // Mettre à jour les labels selon la fonction
    switch (selectedFunction) {
    case 'racine':
    paramAContainer.querySelector('label').textContent = 'Nombre:';
    break;
    case 'logarithme':
    paramAContainer.querySelector('label').textContent = 'Nombre:';
    break;
    case 'sinus':
    case 'cosinus':
    case 'tangente':
    paramAContainer.querySelector('label').textContent = 'Angle (radians):';
    break;
    case 'factorielle':
    paramAContainer.querySelector('label').textContent = 'Nombre:';
    break;
    case 'pgcd':
    case 'ppcm':
    paramAContainer.querySelector('label').textContent = 'Premier nombre:';
    paramBContainer.querySelector('label').textContent = 'Deuxième nombre:';
    break;
    default:
    paramAContainer.querySelector('label').textContent = 'Paramètre a:';
    paramBContainer.querySelector('label').textContent = 'Paramètre b:';
}
});

    // Traitement du formulaire
    mathForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedFunction = functionSelect.value;
    const a = parseFloat(paramA.value);
    const b = paramB.value ? parseFloat(paramB.value) : null;

    try {
    let result;

    if (['racine', 'logarithme', 'sinus', 'cosinus', 'tangente', 'factorielle'].includes(selectedFunction)) {
    result = mathFunctions[selectedFunction](a);
} else {
    result = mathFunctions[selectedFunction](a, b);
}

    // Afficher le résultat
    resultValue.textContent = result;
    resultContainer.style.display = 'block';
    resultContainer.querySelector('.alert').className = 'alert alert-success';
} catch (error) {
    // Afficher l'erreur
    resultValue.textContent = `Erreur: ${error.message}`;
    resultContainer.style.display = 'block';
    resultContainer.querySelector('.alert').className = 'alert alert-danger';
}
});

    // Initialiser l'affichage
    functionSelect.dispatchEvent(new Event('change'));
});