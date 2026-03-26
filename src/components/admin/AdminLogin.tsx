"use client";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Accès refusé par Infomaniak.",
  not_authorized:
    "Votre compte Infomaniak n'est pas autorisé à accéder à l'administration.",
  auth_failed: "Erreur lors de l'authentification. Réessayez.",
  invalid_state: "Session expirée. Réessayez.",
  missing_params: "Paramètres manquants dans la réponse d'authentification.",
};

export function AdminLogin({ error }: { error?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Un franc par mille — Espace comité
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Connectez-vous avec votre compte Infomaniak pour accéder au panneau
            d&apos;administration.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded text-center">
              {ERROR_MESSAGES[error] || "Une erreur est survenue."}
            </div>
          )}

          <a
            href="/api/admin/auth"
            className="block w-full bg-bleu text-white font-semibold py-2.5 rounded hover:bg-bleu-clair transition-colors text-center no-underline"
          >
            Se connecter avec Infomaniak
          </a>

          <p className="text-xs text-gray-400 text-center">
            Seuls les comptes autorisés par le comité peuvent accéder à cet
            espace.
          </p>
        </div>
      </div>
    </div>
  );
}
