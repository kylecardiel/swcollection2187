export class Validator {

    static isEmailValid = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }
}