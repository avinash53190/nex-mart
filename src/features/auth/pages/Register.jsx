import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingButton from '../../../shared/components/LoadingButton'
import InlineStatusIndicator from '../../../shared/components/InlineStatusIndicator'
import { useAsyncState } from '../../../shared/hooks/useAsyncState'
import { useFeedbackActions } from '../../../shared/hooks/useFeedbackActions'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const asyncState = useAsyncState()
  const feedback = useFeedbackActions()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      const message = 'Passwords do not match'
      asyncState.fail(message)
      feedback.notifyError(message)
      return
    }
    if (form.password.length < 6) {
      const message = 'Password must be at least 6 characters'
      asyncState.fail(message)
      feedback.notifyError(message)
      return
    }
    asyncState.start()
    const resolved = await register(form.name, form.email, form.password)
    if (resolved.success) {
      asyncState.succeed()
      feedback.authRegisterSuccess(resolved.user)
      navigate('/')
      return
    }
    asyncState.fail(resolved.error)
    feedback.notifyError(resolved.error)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
          <p className="text-slate-500 mt-1">Join NexMart today</p>
        </div>

        <div className="card p-8">
          <InlineStatusIndicator type="error" message={asyncState.error} className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
              { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
              { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
              { name: 'confirm', label: 'Confirm Password', placeholder: '••••••••', type: 'password' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} className="input" required />
              </div>
            ))}
            <LoadingButton type="submit" loading={asyncState.isLoading} className="btn-primary w-full py-3 text-base mt-2">
              Create Account
            </LoadingButton>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
