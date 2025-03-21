import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import * as React from 'react';

// Import the ErrorBoundary component
import ErrorBoundary from './components/ErrorBoundary';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Wrap the entire App with the ErrorBoundary
        root.render(
            <ErrorBoundary
                fallback={
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                        <div className="p-6 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                The application encountered an unexpected error.
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                                >
                                    Refresh Page
                                </button>
                                <a href="/" className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition'>
                                    Go Back</a>

                            </div>
                        </div>
                    </div>
                }
            >
                <App {...props} />
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();