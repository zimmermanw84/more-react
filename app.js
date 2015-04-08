!function() {

    "use strict";

    var FriendsContainer = React.createClass({
        getInitialState: function() {
           return {
               username: "Guest",
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
                    <h2>Name: {this.state.username}</h2>
                    <AddFriendForm submitEvent={this.submitFormAddFriend} />
                    <ShowList friends={this.state.friends} />
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
                   var nodeToDelete = React.findDOMNode(this.keys)
                    console.log(nodeToDelete)

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


    return React.render(
      <FriendsContainer url="http://localhost:3000/questions" />,
        document.getElementById('app')
    );

}();