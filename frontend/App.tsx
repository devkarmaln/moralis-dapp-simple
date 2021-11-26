import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
    useMoralis,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall,
    useWeb3Transfer,
} from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import { Button, Header } from "react-native-elements";

const styles = StyleSheet.create({
    center: { alignItems: "center", justifyContent: "center", flex: 1 },
    topCenter: { alignItems: "center" },

    white: { backgroundColor: "white" },
    margin: { marginBottom: 20 },
    marginLarge: { marginBottom: 35 },
    weightHeavey: { fontWeight: "700", fontSize: 20 },
});

function Web3ApiExample(): JSX.Element {
    const { Moralis, enableWeb3, isWeb3Enabled, web3EnableError } = useMoralis();
    const {
        account: { getNativeBalance },
    } = useMoralisWeb3Api();

    // defaults to eth chain and user logged in address, 
    // if you want custom, you can pass in the options argument
    const { data, isFetching, error } = useMoralisWeb3ApiCall(getNativeBalance, { chain: "ropsten" });

    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState(0.0)

    const { fetch } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount.toString()),
        receiver: address.toString(),
        type: "native",
    });

    useEffect(() => {

    })

    const transfer = async () => {
        if (isValidate()) {
            enableWeb3()

            console.log("isWeb3Enabled", isWeb3Enabled)
            console.log("web3EnableError", web3EnableError)

            fetch();

            // const web3 = await Moralis.Web3.enable();

            // await account
            //     .getTokenTransfers({ address: user.get("ethAddress"), chain: "ropsten" })
            //     .then((result) => console.log(result))
            //     .catch((e) => alert(e.message));
        }
    }

    function isValidate() {
        if (address.toString().trim().length <= 0) {
            alert("Empty wallet address")
            return false
        }

        if (amount <= 0) {
            alert("Add valid amount")
            return false
        }

        let balance = parseFloat((data ? data.balance / ("1e" + "18") : "0").toString())
        // console.log(typeof (balance), balance)

        if (amount > balance) {
            alert("Add valid amount")
            return false
        }

        return true
    }

    if (isFetching) {
        return (
            <View style={styles.marginLarge}>
                <Text>Fetching token-balances...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.marginLarge}>
                <Text>Error:</Text>
                <Text>{JSON.stringify(error)}</Text>
            </View>
        );
    }

    return (
        <View style={styles.marginLarge}>
            <Text style={styles.weightHeavey}>Native balance</Text>

            <Text style={styles.weightHeavey}>
                {/* @ts-ignore */}
                {data ? data.balance / ("1e" + "18") : "none"}
            </Text>

            <View style={{ marginTop: 8, marginHorizontal: 40 }}>
                <View>
                    <Text>Wallet Address</Text>
                    <View style={{ borderColor: "black", borderWidth: 2, padding: 2 }}>
                        <TextInput
                            placeholder="0x....."
                            keyboardType="default"
                            value={address}
                            onChangeText={(text) => setAddress(text)} />
                    </View>
                </View>

                <View>
                    <Text>Enter Amount</Text>
                    <View style={{ borderColor: "black", borderWidth: 2, padding: 2 }}>
                        <TextInput
                            placeholder="amount"
                            keyboardType="numeric"
                            onChangeText={(text) => setAmount(parseFloat(text))} />
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        buttonStyle={{ width: 200, backgroundColor: "green" }}
                        containerStyle={{ margin: 5 }}
                        disabledStyle={{
                            borderWidth: 2,
                            borderColor: "green",
                        }}
                        onPress={transfer}
                        title="Transfer"></Button>
                </View>

            </View>
        </View>
    );
}

function UserExample(): JSX.Element {
    const { user } = useMoralis();
    console.log("USER", JSON.stringify(user))
    return (
        <View style={styles.marginLarge}>
            <Text style={styles.weightHeavey}>UserName: {user.getUsername()}</Text>
            <Text style={styles.weightHeavey}>
                User Email: {user.getEmail() ?? "-"}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.weightHeavey}>
                User Address: {user.get("ethAddress")}
            </Text>
        </View>
    );
}

function App(): JSX.Element {
    const connector = useWalletConnect();
    const {
        authenticate,
        authError,
        isAuthenticating,
        isAuthenticated,
        logout,
    } = useMoralis();

    return (
        <View style={[StyleSheet.absoluteFill, styles.white]}>
            <View>
                <Header
                    backgroundImageStyle={{}}
                    barStyle="default"
                    centerComponent={{
                        text: "My Awesome DAPP",
                        style: { color: "#fff" },
                    }}
                    centerContainerStyle={{}}
                    containerStyle={{}}
                    leftComponent={{ icon: "menu", color: "#fff" }}
                    leftContainerStyle={{}}
                    placement="center"
                    rightComponent={{ icon: "home", color: "#fff" }}
                    rightContainerStyle={{}}
                    statusBarProps={{}}
                />
            </View>
            <View style={[styles.white, styles.center]}>
                <View style={styles.marginLarge}>
                    {authError && (
                        <>
                            <Text>Authentication error:</Text>
                            <Text style={styles.margin}>{authError.message}</Text>
                        </>
                    )}
                    {isAuthenticating && (
                        <Text style={styles.margin}>Authenticating...</Text>
                    )}
                    {!isAuthenticated && (
                        <Button
                            buttonStyle={{ width: 200, backgroundColor: "green" }}
                            containerStyle={{ margin: 5 }}
                            disabledStyle={{
                                borderWidth: 2,
                                borderColor: "#00F",
                            }}
                            onPress={() => authenticate({ connector })}
                            loadingProps={{ animating: true }}
                            title="Authenticate With Crypto Wallet"></Button>
                    )}
                    {isAuthenticated && (
                        <>
                            <View>
                                <Button
                                    buttonStyle={{ width: 200, backgroundColor: "red" }}
                                    containerStyle={{ margin: 5 }}
                                    disabledStyle={{
                                        borderWidth: 2,
                                        borderColor: "#00F",
                                    }}
                                    onPress={() => logout()}
                                    title="Logout"></Button>

                            </View>
                        </>
                    )}
                </View>
                {isAuthenticated && (
                    <View>
                        <UserExample />
                        <Web3ApiExample />
                    </View>
                )}
            </View>
        </View>
    );
}

export default App;
