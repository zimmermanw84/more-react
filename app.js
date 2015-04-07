!function() {

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
        //   TODO: add form event handling
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
                    <ShowList friends={this.state.friends} />
                    <AddFriendForm submitEvent={this.submitFormAddFriend} />
                </div>
            )
        }
    });

    var AddFriendForm = React.createClass({
       // TODO: Add form handling function
       submitAddFriendForm: function(event) {
           event.preventDefault();
           var friendToAdd = React.findDOMNode(this.refs.friendName).value.trim();

           //console.log(friendToAdd);
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

    var ShowList = React.createClass({
        getInitialState: function() {
            return {
                friends: this.props.friends
            }
        },
        render: function() {
            var allFriends = this.props.friends;
               return (
                   <ol>
                       {allFriends.map(function(friend) {
                           return <li key={friend.id}>{friend.content}</li>
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