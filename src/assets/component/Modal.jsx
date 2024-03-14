import React, { Component } from "react";
import closeBlack_ic from "../media/icon/close_black.png";
import success_ic from "../media/icon/success.png";

class Modal extends Component {
  render() {
    return (
      <>
        <div className="modal">
          <article className="modal-container">
            <header className="modal-container-header">
              <h1 className="modal-container-title">
                <img src={success_ic} className="icon" alt="Success Icon" />
                {this.props.heading}
              </h1>
              <button
                className="icon-button"
                onClick={this.props.onCloseModal} // Close modal on button click
              >
                <img src={closeBlack_ic} className="icon" alt="Close Icon" />
              </button>
            </header>
            <section className="modal-container-body rtf">
              <p>{this.props.children}</p>
            </section>
            <footer className="modal-container-footer">
              <button
                className="button is-ghost"
                onClick={this.props.onDecline}
              >
                Decline
              </button>
              <button
                className="button is-primary"
                onClick={this.props.onAccept}
              >
                Accept
              </button>
            </footer>
          </article>
        </div>
      </>
    );
  }
}

export default Modal;
