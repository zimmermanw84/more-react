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
        handleSubmitEvent: function() {
        //   TODO: add form event handling
        },
        render: function() {
            return (
                <div>
                    <h2>Name: {this.state.username}</h2>
                    <ShowList friends={this.state.friends} />
                    <AddFriendForm submitEvent={this.handleSubmitEvent} />
                </div>
            )
        }
    });

    var AddFriendForm = React.createClass({
       // TODO: Add form handling function
       render: function() {
           return (
               <form>
                    Add Friend: <input type="text" />
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