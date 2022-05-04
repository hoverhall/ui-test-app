export const sendData = (id, name, number) => {
    fetch(`http://127.0.0.1:8081/api/v1/buy/?id=${id}&name=${name}&number=${number}`, {
        method: 'POST'
    });
}