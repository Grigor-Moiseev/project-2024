let url = 'https://grigor-moiseev.github.io/dataTest/data.json';
fetch(url)
.then(resp => resp.json())
.then(resp => console.log(resp))
