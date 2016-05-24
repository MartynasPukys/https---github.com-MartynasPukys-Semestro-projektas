import React from 'react';
import { Link } from 'react-router';

class PageBottom extends React.Component {
    render() {
        return (
            <div className="landing-content">
                <section>
                    <h1>Recent Games</h1>
                    <ol id="history wrapper">
                        {this.props.children}
                    </ol>
                    <Link to="/feed" className="button">SEE ALL</Link>
                </section>
            </div>
        );
    }
}

PageBottom.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default PageBottom;
