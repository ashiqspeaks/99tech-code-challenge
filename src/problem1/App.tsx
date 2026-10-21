import './style.css';
import {
    sum_to_n_a,
    sum_to_n_b,
    sum_to_n_c,
} from './sum_to_n.js';

const implementations = [
    {
        title: 'Looping',
        functionName: 'sum_to_n_a',
        description: 'Iterative approach',
        code: `const sum_to_n_a = function(n) {
  if (n <= 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};`,
    },
    {
        title: 'Reduce',
        functionName: 'sum_to_n_b',
        description: 'Array reduction',
        code: `const sum_to_n_b = function(n) {
  if (n <= 0) return 0;

  return Array.from(
    { length: n },
    (_, i) => i + 1
  ).reduce((x, y) => x + y, 0);
};`,
    },
    {
        title: 'Arithmetic Formula',
        functionName: 'sum_to_n_c',
        description: 'Constant-time formula',
        code: `const sum_to_n_c = function(n) {
  if (n <= 0) return 0;

  return (n * (n + 1)) / 2;
};`,
    },
];

export default function Problem1() {
    const results = [
        { label: 'Looping · n = 5', value: sum_to_n_a(5) },
        { label: 'Reduce · n = 10', value: sum_to_n_b(10) },
        { label: 'Formula · n = 15', value: sum_to_n_c(15) },
    ];

    return (
        <main className="problem1-page">
            <header className="problem1-header">
                <a href="/">← Dashboard</a>
                <span className="problem1-badge">PROBLEM 01</span>
            </header>

            <section className="problem1-intro">
                <h1>Three ways to sum to n</h1>
                <p>Three JavaScript implementations of the same function.</p>
            </section>

            <section className="problem1-code-grid">
                {implementations.map((implementation, index) => (
                    <article className="problem1-code-card" key={implementation.functionName}>
                        <div className="problem1-card-header">
                            <div className="problem1-card-number">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                                <h2>{implementation.title}</h2>
                                <p>{implementation.description}</p>
                            </div>
                        </div>

                        <div className="problem1-code-toolbar">
                            <span>{implementation.functionName}</span>
                            <span>JavaScript</span>
                        </div>

                        <pre className="problem1-code">
              <code>{implementation.code}</code>
            </pre>
                    </article>
                ))}
            </section>

            <section className="problem1-results">
                <h2>Example results</h2>
                <div className="problem1-results-grid">
                    {results.map((result) => (
                        <div className="problem1-result-card" key={result.label}>
                            <span>{result.label}</span>
                            <strong>{result.value}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
