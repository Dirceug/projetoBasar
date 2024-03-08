import { render, screen, waitFor } from '@testing-library/vue'
import '@testing-library/jest-dom'
import SignUp from './SignUp.vue'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Sign Up', () => {
  it('has Sign Up header', () => {
    render(SignUp)
    const header = screen.getByRole('heading', { name: 'Sign Up' })
    expect(header).toBeInTheDocument()
  })

  it('has a label username input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('Username')).toBeInTheDocument()
  })
  it('has username input placeholder', () => {
    render(SignUp)
    expect(screen.queryByPlaceholderText('Escolha um apelido')).toBeInTheDocument()
  })

  it('has a label e-mail input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('E-mail')).toBeInTheDocument()
  })
  it('has e-mail input placeholder', () => {
    render(SignUp)
    expect(screen.queryByPlaceholderText('Digite aqui seu e-mail')).toBeInTheDocument()
  })

  it('has a label Password input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('Password')).toBeInTheDocument()
  })
  it('has Password input placeholder', () => {
    render(SignUp)
    expect(screen.queryByPlaceholderText('Coloque aqui a senha')).toBeInTheDocument()
  })
  it('has a password type for  Password input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('Password').type).toBe('password')
  })

  it('has a label repeat input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('Password Repeat')).toBeInTheDocument()
  })
  it('has Password repeat input placeholder', () => {
    render(SignUp)
    expect(screen.queryByPlaceholderText('Coloque aqui a senha novamente')).toBeInTheDocument()
  })
  it('has a password repeat type for Password input', () => {
    render(SignUp)
    expect(screen.queryByLabelText('Password Repeat').type).toBe('password')
    // expect(screen.queryByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('has a signUp Button', () => {
    render(SignUp)
    const button = screen.getByRole('button', { name: 'Sign Up' })
  })
  it('disables the button initially', () => {
    render(SignUp)
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeDisabled()
  })

  describe('when user sets same value for password inputs', () => {
    it('enables buttons', async () => {
      const user = userEvent.setup()
      render(SignUp)
      const passwordInput = screen.getByLabelText('Password')
      const passwordRepeatInput = screen.getByLabelText('Password Repeat')
      await user.type(passwordInput, 'P4ssword')
      await user.type(passwordRepeatInput, 'P4ssword')
      expect(screen.getByRole('button', { name: 'Sign Up' })).toBeEnabled()
    })

    describe('when user submits form', () => {
      it('sends username, email password to the backend', async () => {
        let requestBody
        const server = setupServer(
          http.post('/api/v1/users', async ({ request }) => {
            requestBody = await request.json()
            return HttpResponse.json({})
          })
        )
        server.listen()
        const user = userEvent.setup()
        render(SignUp) //Função que renderiza o componente
        const usernameInput = screen.getByLabelText('Username')
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Password')
        const passwordRepeatInput = screen.getByLabelText('Password Repeat')
        await user.type(usernameInput, 'user1')
        await user.type(emailInput, 'user1@mail.com')
        await user.type(passwordInput, 'P4ssword')
        await user.type(passwordRepeatInput, 'P4ssword')
        const button = screen.getByRole('button', { name: 'Sign Up' })
        await user.click(button)
        await waitFor(() => {
          expect(requestBody).toEqual({
            username: 'user1',
            email: 'user1@mail.com',
            password: 'P4ssword'
          })
        })
        server.close()
      })
    })
  })

  describe('When there is an ongoing API call', () => {
    it.only('does not alow clicking in the button'),
      async () => {
        let counter = 0
        // let requestBody
        const server = setupServer(
          http.post('/api/v1/users', () => {
            // requestBody = await request.json()
            counter += 1
            return HttpResponse.json({})
          })
        )
        server.listen()
        const user = userEvent.setup()
        render(SignUp) //Função que renderiza o componente
        const usernameInput = screen.getByLabelText('Username')
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Password')
        const passwordRepeatInput = screen.getByLabelText('Password Repeat')
        await user.type(usernameInput, 'user1')
        await user.type(emailInput, 'user1@mail.com')
        await user.type(passwordInput, 'P4ssword')
        await user.type(passwordRepeatInput, 'P4ssword')
        const button = screen.getByRole('button', { name: 'Sign Up' })
        await user.click(button)
        await user.click(button)
        await user.click(button)
        await user.click(button)
        await waitFor(() => {
          expect(counter).toBe(1)
        })
        server.close()
      }
  })
})
