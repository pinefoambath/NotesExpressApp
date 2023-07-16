window.onload = () => {
  document.getElementById('completed').addEventListener('change', (event) => {
    if (event.target.checked) {
      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      })
    }
  })
}
