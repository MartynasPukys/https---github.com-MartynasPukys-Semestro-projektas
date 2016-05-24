import React from 'react';

class AlertsContainer extends React.Component {
    render() {
        return (
            <div className="alerts-container">
                <div className="alert blue">
                       Dollitia dicta quasi voluptatum totam labore
                       doloremque ea fugit consectetur, itaque ab!
                    <button className="icon-close" />
                </div>
                <div className="alert red">
                        D quasi voluptatum totam labore doloremque
                        ea fugit consectetur, itaque ab!
                    <button className="icon-close" />
                </div>
            </div>
        );
    }
}

export default AlertsContainer;
