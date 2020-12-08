import { NotFoundException } from '@nestjs/common';

//feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.annunceFriendship(name);
  }

  annunceFriendship(name) {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) throw new NotFoundException();

    this.friends.splice(idx, 1);
  }
}

//tests
describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Andre');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship ', () => {
    friendsList.annunceFriendship = jest.fn();

    expect(friendsList.annunceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Andre');
    expect(friendsList.annunceFriendship).toHaveBeenCalledWith('Andre');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Andre');
      expect(friendsList.friends[0]).toEqual('Andre');

      friendsList.removeFriend('Andre');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() => {
        friendsList.removeFriend('Andre');
      }).toThrow(NotFoundException);
    });
  });
});
