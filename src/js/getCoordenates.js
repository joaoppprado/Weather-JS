function getCurrentCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function getUserLocation() {
    try {
        const position = await getCurrentCoords();
        return position;
    } catch (error) {
        alert("Erro ao localizar usuário: " + error.message);
    }
}

export { getUserLocation as userCoords };
