
import './style.css';
import originalCode from './originalCode';
import refactoredCode from './refactoredCode';

export default function Problem3() {
    return (
        <main className="comparison-page">
            <header className="comparison-header">
                <a href="/">← Dashboard</a>
                <h1>Problem 3: Messy React</h1>
            </header>

            <section className="comparison-panels">
                <div className="code-panel original-panel">
                    <div className="code-panel-header">
                        <div>
                            <h2>Original Code</h2>
                            <p>Before refactoring</p>
                        </div>
                        <span className="code-badge original-badge">TSX</span>
                    </div>

                    <pre>
                        <code>{originalCode}</code>
                    </pre>
                </div>

                <div className="code-panel refactored-panel">
                    <div className="code-panel-header">
                        <div>
                            <h2>Refactored Code</h2>
                            <p>Improved logic and readability</p>
                        </div>
                        <span className="code-badge refactored-badge">TSX</span>
                    </div>

                    <pre>
                        <code>{refactoredCode}</code>
                    </pre>
                </div>
            </section>
        </main>
    );
}
