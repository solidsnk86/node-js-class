const url = 'https://campus.frsr.utn.edu.ar/moodle/mod/quiz/attempt.php?attempt=362420&cmid=50523'

const getData = async () => {
  const res = await fetch(url)
  const data = res.text()
  return data
}

const data = await getData()
console.log(data.includes('CALCULAR P(A) ?'))
