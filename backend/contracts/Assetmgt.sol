// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Assetmgt {
    // The `mapping` data type is used to map user addresses to user structs.
    mapping(address => User) public users;

    // The `User` struct represents a user in the contract.
    // It contains the user's name, age, address balance, and creation date..
    struct User {
        string name;
        uint256 balance;
        uint256 created;
        uint256 initialValue;
        uint256 currentValue;   }

    // The `usersAdded` array will store the addresses of all users added to the mapping.
    address[] public usersAdded;

    // The `Activity` struct represents an activity in the contract.
    // It contains the activity blockNum, caller address, and activity description.
    struct Activity {
        uint256 blockNum;
        address caller;
        string description;
    }

    // The `activities` array will store a log of all activities in the contract.
    Activity[] public activities;

    // The `addUser` function allows anyone to add a new user to the mapping.
    function addUser(
        address userAddress,
        string memory userName,
        uint256 userInitialValue
    ) public {
        // Add the new user to the mapping.
        users[userAddress] = User({
            name: userName,
            balance: address(userAddress).balance,
            created: block.number,
            initialValue: userInitialValue,
            currentValue: userInitialValue + address(userAddress).balance
        });

        // Add the user's address to the `usersAdded` array.
        usersAdded.push(userAddress);

        // Add an activity to the `activities` array.
        activities.push(
            Activity({
                blockNum: block.number,
                caller: msg.sender,
                description: "User added: " //+ userAddress.toHexString()
            })
        );
    }

    // The `getUser` function allows anyone to retrieve a user from the mapping by their address.
    function getUser(address userAddress)
        public
        view
        returns (
            string memory,
            uint256,
            uint256
        )
    {
        // Retrieve the user from the mapping.
        User storage user = users[userAddress];

        // Return the user's name, age, address balance, and creation date.
        return (user.name, user.balance, user.created);
    }

    // The `getCurrentValue` function allows anyone to retrieve a user's current value from the mapping by their address.
    function getCurrentValue(address userAddress)
        public
        view
        returns (uint256)
    {
        // Retrieve the user from the mapping.
        User storage user = users[userAddress];

        // Return the user's current value.
        return user.currentValue;
    }

    function transfer(address payable recipient, uint256 amount) public {
    // Retrieve the user from the mapping.
    User storage user = users[msg.sender];

    // Make sure the user has enough balance to transfer the specified amount.
    require(user.currentValue >= amount, "Insufficient balance.");

    // Transfer the ether to the recipient.
    user.currentValue -= amount;
    recipient.transfer(amount);

    // Add an activity to the `activities` array.
    activities.push(
        Activity({
            blockNum: block.number,
            caller: msg.sender,
            description: "Ether transferred"
        })
    );
}


    // The `deposit` function allows a user to deposit ether to their address and update their current value.
    // function deposit() public payable {
    //     // Retrieve the user from the mapping.
    //     User storage user = users[msg.sender];

    //     // Update the user's current value by adding the amount of ether received.
    //     user.currentValue += msg.value;

    //     // Add an activity to the `activities` array.
    //     activities.push(
    //         Activity({
    //             blockNum: block.number,
    //             caller: msg.sender,
    //             description: "Ether deposited"
    //         })
    //     );
    // }
}
