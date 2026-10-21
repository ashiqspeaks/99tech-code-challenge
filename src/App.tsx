import Problem2 from './problem2/App';
import Problem3 from "./problem3/App";
import Problem1 from "./problem1/App";

const problems = [
    {
        id: 1,
        title: 'Sum to N',
        description: 'Explore three approaches to summing integers.',
        path: '/problem/1',
        status: 'Completed',
    },
    {
        id: 2,
        title: 'Fancy Form',
        description: 'Build a polished token swap interface.',
        path: '/problem/2',
        status: 'Completed',
    },
    {
        id: 3,
        title: 'Messy React',
        description: 'Fix the computational inefficiencies and anti-patterns.',
        path: '/problem/3',
        status: 'Completed',
    }
];

export default function App() {
    if (window.location.pathname === '/problem/2') {
        return <Problem2 />;
    }

    if (window.location.pathname === '/problem/3') {
        return <Problem3 />;
    }

    if (window.location.pathname === '/problem/1') {
        return <Problem1 />;
    }

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <h1>99TECH · CODE CHALLENGE - FRONTEND</h1>
            </header>

            <section className="problem-grid" aria-label="Challenge problems">
                {problems.map((problem) => (
                    <a
                        className="problem-card"
                        href={problem.path}
                        key={problem.id}
                    >
                        <div className="card-top">
              <span className="problem-number">
                {String(problem.id).padStart(2, '0')}
              </span>
                            <span className={`status`}>
                {problem.status}
              </span>
                        </div>

                        <h2>{problem.title}</h2>
                        <p>{problem.description}</p>

                        <span className="card-link">
              Check Solution <span aria-hidden="true">↗</span>
            </span>
                    </a>
                ))}
            </section>
        </main>
    );
}
