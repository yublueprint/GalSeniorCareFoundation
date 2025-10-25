'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthTestPage() {
  const {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      setMessage('Signing up...');
      await signUp(email, password);
      setMessage('Sign up successful! Check your email for verification.');
    } catch (err) {
      setMessage(`Sign up failed: ${(err as Error).message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      setMessage('Signing in...');
      await signIn(email, password);
      setMessage('Sign in successful!');
    } catch (err) {
      setMessage(`Sign in failed: ${(err as Error).message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      setMessage('Signing out...');
      await signOut();
      setMessage('Signed out successfully!');
    } catch (err) {
      setMessage(`Sign out failed: ${(err as Error).message}`);
    }
  };

  const handleSendVerification = async () => {
    try {
      setMessage('Sending verification email...');
      await sendEmailVerification();
      setMessage('Verification email sent! Check your inbox.');
    } catch (err) {
      setMessage(`Failed to send verification: ${(err as Error).message}`);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setMessage('Sending password reset email...');
      await sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setMessage(`Failed to send password reset: ${(err as Error).message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Firebase Auth Test Page</h1>

      {/* Current User Status */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Current User Status</h2>
        {user ? (
          <div>
            <p className="text-green-600 font-semibold">✓ Signed In</p>
            <p className="text-sm mt-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>UID:</strong> {user.uid}
            </p>
            <p className="text-sm">
              <strong>Email Verified:</strong>{' '}
              {user.emailVerified ? '✓ Yes' : '✗ No'}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Not signed in</p>
        )}
        {error && (
          <p className="text-red-600 mt-2">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div className="mb-4 p-4 border rounded-lg bg-blue-50">
          <p>{message}</p>
        </div>
      )}

      {!user ? (
        /* Sign In/Sign Up Form */
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sign In / Sign Up</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Min 6 characters"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
          <div>
            <button
              onClick={handlePasswordReset}
              className="text-sm text-blue-600 hover:underline"
              disabled={!email}
            >
              Forgot password? Send reset email
            </button>
          </div>
        </div>
      ) : (
        /* Signed In Actions */
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Account Actions</h2>
          <div className="flex flex-col gap-2">
            {!user.emailVerified && (
              <button
                onClick={handleSendVerification}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Send Email Verification
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Testing Instructions */}
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Testing Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Enter an email and password (min 6 characters)</li>
          <li>Click "Sign Up" to create a new account</li>
          <li>Check your email for verification link (optional)</li>
          <li>Click "Sign Out" to test sign out</li>
          <li>Click "Sign In" to test signing back in</li>
          <li>Test "Forgot password" to receive a reset email</li>
        </ol>
      </div>
    </div>
  );
}
