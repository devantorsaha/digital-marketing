'use client';

export default function PortfolioCard({ icon, tag, title, description, stats }) {
    return (
        <div className="portfolio-card" data-aos="fade-up">
            <div className="portfolio-image">
                <i className={`fas ${icon}`}></i>
            </div>
            <div className="portfolio-content">
                <span className="portfolio-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="portfolio-stats">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <span className="stat">{stat.value}</span>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}