!function() {

    var FriendsContainer = React.createClass({
        getInitialState: function() {
           return {
               username: "Guest",
               friends: ['Chewy']
           }
        },
        render: function() {
            return (
                <div>
                    <h2>Name: {this.state.username}</h2>
                    <ShowList friends={this.state.friends} />
                </div>
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
            var allFrends = this.props.friends;
               return (
                   <ol>
                       {allFrends.map(function(friend) {
                           return <li key={friend.id}>{friend}</li>
                       })}
                   </ol>
               );

        }
    });


    return React.render(
      <FriendsContainer />,
        document.getElementById('app')
    );

}();