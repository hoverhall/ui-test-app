export function fetchData() {
    return new Promise((resolve) => {
      fetch(`http://127.0.0.1:8081/api/v1/?products=all`)
        .then(response => response.json())
        .then(data => {
            resolve([...data]);
        })
        .catch(err => console.error(this.props.url, err.toString()))
    });
  }