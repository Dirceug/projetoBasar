vi.mock('axios')
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom'
import SignUp from './SignUp.vue'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

beforeEach(() => {
  vi.clearAllMocks()
})

const setup = async () => {
  const user = userEvent.setup()
  const result = render(SignUp)
  const usernameInput = screen.getByLabelText('Username')
  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')
  const passwordRepeatInput = screen.getByLabelText('Password Repeat')
  await user.type(usernameInput, 'user1')
  await user.type(emailInput, 'user1@mail.com')
  await user.type(passwordInput, 'P4ssword')
  await user.type(passwordRepeatInput, 'P4ssword')
  const button = screen.getByRole('button', { name: 'Sign Up' })
  return {
    ...result,
    user,
    elements: {
      button
    }
  }
}

describe('Sign Up', () => {
  describe('when user sets same value for password inputs', () => {
    describe('when user submits form', () => {
      it('sends username, email password to the backend', async () => {
        const {
          user,
          elements: { button }
        } = await setup()
        await user.click(button)
        expect(axios.post).toHaveBeenCalledWith('/api/v1/users', {
          username: 'user1',
          email: 'user1@mail.com',
          password: 'P4ssword'
        })
      })
      describe('When there is an ongoing API call', () => {
        it('does not alow clicking in the button', async () => {
          const {
            user,
            elements: { button }
          } = await setup()
          await user.click(button)
          await user.click(button)
          await user.click(button)
          await user.click(button)
          expect(axios.post).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
