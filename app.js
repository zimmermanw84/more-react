!function() {

    "use strict";

    var FriendsContainer = React.createClass({
        getInitialState: function() {
           return {
               friends: []
           }
        },
        getServerFriends: function() {
          $.ajax({
              url: this.props.url,
              type: "GET",
              success: function(data) {
                  this.setState({friends: data});
              }.bind(this)
          })
        },
        componentDidMount: function() {
          this.getServerFriends();
        },
        submitFormAddFriend: function(friendName) {
            $.ajax({
                url: this.props.url,
                type: "POST",
                data: friendName,
                success: function(data) {
                    var newState = this.state.friends.concat([data]);
                    this.setState({friends: newState});
                }.bind(this)
            })
        },
        render: function() {
            return (
                <div>
                    <AddFriendForm submitEvent={this.submitFormAddFriend} />
                    <ShowList friends={this.state.friends} getCurrentFriends={this.getServerFriends} />
                </div>
            )
        }
    });

    var AddFriendForm = React.createClass({
       submitAddFriendForm: function(event) {
           event.preventDefault();
           var friendToAdd = React.findDOMNode(this.refs.friendName).value.trim();
           this.props.submitEvent({content: friendToAdd});
           React.findDOMNode(this.refs.friendName).value = "";
       },
       render: function() {
           return (
               <form method="POST" onSubmit={this.submitAddFriendForm} >
                   Add Friend: <input type="text" ref="friendName" />
                   <input type="submit" value="Add Friend" />
               </form>
           )
       }
    });

    var DeleteFriendForm = React.createClass({
        handleDeleteEvent: function(event) {
            event.preventDefault();
            var id = this.props.id;
            this.props.deleteFriend(id)
        },
        render: function() {
           return (
           <form method="DELETE" onSubmit={this.handleDeleteEvent} >
               <input type="submit" value="DELETE FOREVER" />
           </form>
           )
       }
    });

    var ShowList = React.createClass({
        deleteFriendForm: function(id) {
            $.ajax({
                url: "http://localhost:3000/questions/" + id,
                type: "DELETE",
                success: function(data) {
                    this.props.getCurrentFriends();
                }.bind(this)
            })
        },
        getInitialState: function() {
            return {
                friends: this.props.friends
            }
        },
        render: function() {
            var _this = this;
            var allFriends = this.props.friends;
               return (
                   <ol>
                       {allFriends.map(function(friend) {
                           return <li key={friend.id}>{friend.content}
                                    <DeleteFriendForm id={friend.id} deleteFriend={_this.deleteFriendForm} />
                                  </li>
                       })}
                   </ol>
               );

        }
    });

    // TODO: break these out into seperate modules / components

    var UserContainer = React.createClass({
        getInitialState: function() {
          return {
              currentUser: { userName: "Guest" },
          }
        },
        submitNewUser: function(userName) {
            this.setState({currentUser: {userName: userName }})
        },
        hideChangeUserForm: function() {

        },
        render: function() {
            return (
                <section>
                    <h1>{this.state.currentUser.userName}</h1>
                    <ChangeUserName updateNewUser={this.submitNewUser} onSubmit={this.hideChangeUserForm} />
                    <LogOutButton />
                </section>
            )
        }
    });


    var ChangeUserName = React.createClass({
        handleNewUser: function(event) {
            event.preventDefault();
            var newName = React.findDOMNode(this.refs.userName).value.trim();
            this.props.updateNewUser(newName);
            React.findDOMNode(this.refs.userName).value = "";
        },
        magicNameStuff: function() {
            var newName = React.findDOMNode(this.refs.userName).value.trim();
            if (newName === "") newName = "Guest";
            this.props.updateNewUser(newName);
        },
        render: function() {
            return (
                <form onSubmit={this.handleNewUser} onChange={this.magicNameStuff} >
                    Enter Name: <input type="text" ref="userName" />
                    <input type="submit" value="Change Name" />
                </form>
            )
        }
    });

    var LogOutButton = React.createClass({
        getInitalState: function() {
            return {
                display:"block"
            }
        },
        render: function() {
            //console.log(this)
           // FIXME: the state is udefined
           return (
               <button style={this.state.display} >Log Out</button>
           )
        }
    });

    return (
        React.render(
            <UserContainer />,
            document.getElementById('user-container')
        ),
        React.render(
            <FriendsContainer url="http://localhost:3000/questions" />,
            document.getElementById('friends-container')
        )
    );

}();