import "../css/portfolioCard.css"

function PortfolioCard({description='',imageLink='', title='', projectLink = ''}) {
    return(
        <div className="portfolio-card">
            <div className="card-image">
                <img src={imageLink} alt={title} />
            </div>
            <div className="card-info">
                <h1 className="card-title">{title}</h1>
                <p className="card-description">{description}</p>
            </div>
            <div className="card-action">
                <a target="blank" href={projectLink}><button>→</button></a>
                <span className="check-out-text">Check it Out</span>
            </div>
        </div>
    )    
}

export default PortfolioCard