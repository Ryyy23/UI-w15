
import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div className="modal">
                <div id="playerModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="close">&times;</span>
                        </div>
                        <div class="modal-body">
                            <div class="container" style="max-width:600px;padding:40px 20px;background:#ebeff2">
                                <section>
                                    <h3>Player Registration Page </h3>
                                    <form class="form-horizontal" id="player-registration" role="form">
                                        <div class="form-group">
                                            <label id="playernamelabel" for="playername" class="control-label col-sm-3">Name</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="playername" placeholder="Mr Anderson" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label id="playericonlabel" for="playericon" class="control-label col-sm-4">Icon</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="playericon" placeholder="fa fa-reddit" />
                                            </div>
                                        </div>
                                        <div class="col-sm-offset-2 col-sm-8">
                                            <button id="submit-player" type="button" class="btn btn-outline-primary">
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;