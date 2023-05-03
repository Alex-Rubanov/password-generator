const sliderLength = document.querySelector('.pass-length input')
const options = document.querySelectorAll('.options input')
const generateBtn = document.querySelector('.generate-btn')
const passwordOutput = document.querySelector('.input-box input')
const passwordIndicator = document.querySelector('.pass-indicator')
const copyIcon = document.querySelector('.input-box span')

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
}

const updatePasswordIndicator = () => {
  const passwordSettings = {}

  options.forEach(option => {
    if (option.checked) {
      passwordSettings[option.id] = option.id
    }
  })

  const isSecured =
    (passwordSettings.uppercase && passwordSettings.numbers) ||
    (passwordSettings.uppercase && passwordSettings.symbols) ||
    passwordSettings.symbols

  console.log(isSecured)
  console.log(passwordSettings)

  if (sliderLength.value > 14 && isSecured) passwordIndicator.id = 'strong'
  else if (sliderLength.value < 10) passwordIndicator.id = 'weak'
  else passwordIndicator.id = 'medium'
}

const updateSliderLength = () => {
  const length = sliderLength.value || 15
  document.querySelector('.pass-length span').textContent = length
  generatePassword()
  updatePasswordIndicator()
}

const generatePassword = () => {
  let staticPassword = ''
  let randomPassword = ''
  let excludeDuplicate = false
  const passwordLength = sliderLength.value

  options.forEach(option => {
    if (option.checked) {
      if (option.id !== 'dublicate' && option.id !== 'spaces') {
        staticPassword += characters[option.id]
      } else if (option.id === 'spaces') {
        staticPassword += `  ${staticPassword}  `
      } else {
        excludeDuplicate = true
      }
    }
  })

  for (let i = 0; i < passwordLength; i++) {
    const randomCharacter =
      staticPassword[Math.floor(Math.random() * staticPassword.length)]

    if (excludeDuplicate) {
      randomPassword.includes(randomCharacter)
        ? i--
        : (randomPassword += randomCharacter)
    } else {
      randomPassword += randomCharacter
    }
  }

  passwordOutput.value = randomPassword
  updatePasswordIndicator()
}

const copyPassword = () => {
  navigator.clipboard.writeText(passwordOutput.value)
  copyIcon.innerText = 'check'

  setTimeout(() => (copyIcon.innerText = 'copy_all'), 1500)
}

sliderLength.addEventListener('input', updateSliderLength)
generateBtn.addEventListener('click', generatePassword)
copyIcon.addEventListener('click', copyPassword)

options.forEach(option =>
  option.addEventListener('input', () => {
    updatePasswordIndicator()
    generatePassword()
  })
)
