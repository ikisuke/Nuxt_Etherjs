
<template>
  <header id="header">
   <h1>Ethereum test dapp</h1>
      <h3>Status</h3>
          <p>Accounts: <span id="accounts">{{currentAccounts}}</span></p>
              <h4 class>Actions</h4>
              <button v-on:click="onClickConnect">{{ isInstall }}</button>
              <input type="text" v-on:input="inputToken">
              <button v-on:click="onClickMint">Mint</button>
              <p>{{ isMinted }}</p>
              <button v-on:click="onClickIsHold">isHold</button>
              <p>{{ isHold }}</p>
              <button v-on:click="getCapture">Capture</button>
  </header>
</template>

<script>
  // 主に以下のサイトのNuxt版みたいなもの
  // https://zenn.dev/ryo_takahashi/articles/c27e5e884f12d0
  // connectによって、ボタンをdisableにする機能は付けてません。
  export default {
      components: {
      },
  data(){
  return {
    currentAccounts: null,
    isHold: false,
    isMinted: "Not yet",
    currentContract: null,
    isInstall: "",
    tokenId: "",

    // ContractAbiをここに貼り付ける
    // 実際の開発だと、外部のJsonファイルに保存した方がいいと思う。
    // ContractAddressも同じく
    ContractAbi: [
],
ContractAddress: "YOUR_CONTRACT＿ADDRESS",
        };
      },
  mounted(){
    this.MetaMaskClientCheck();
  },
  methods: {
    inputToken: function(event) {
      this.tokenId = event.target.value;
      console.log(this.tokenId);
    },
    onClickConnect:async function() {
      try {
        // ether.jsはpluginフォルダの中で新しく作成して、$ethersを定義する
        // 直接importすると動かないらしいので、ここは要検証
        // 参考サイト
        // https://medium.com/coinmonks/blockchain-day-2-etherjs-vuejs-4a2896a50ef2
        // もっとVueの開発者増えてくれ（願望）
        const { ethereum } = window;

        const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
          })


        this.currentAccounts = newAccounts[0];

        console.log(this.$ethers);

        if (this.isMetaMaskConnected()) {


	    //provider(Metamask)を設定
            const provider = new this.$ethers.providers.Web3Provider(window.ethereum);
	    //signerの設定
            const signer = provider.getSigner(0);
	    //コントラクトのインスタンスを生成
            this.currentContract = new this.$ethers.Contract(this.ContractAddress, this.ContractAbi, signer);
            console.log(this.currentContract);
        }
    } catch(error) {
        console.error(error);
    }
},
isMetaMaskConnected: function() {return this.currentAccounts && this.currentAccounts.length > 0},

isMetaMaskInstalled: function() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
},
onClickMint: async function() {
    try {
    await this.currentContract.mint(this.tokenId);
		this.isMinted = 'minted';
    } catch (error) {
		console.error(error);
      if (!this.tokenId) {
        this.isMinted = 'Ops! Please enter your TokenID!'
      } else {
		    this.isMinted = 'Already minted';
      }
    }
},
onClickIsHold: async function() {
	try {
		const holder = await this.currentContract.isHold(this.tokenId);
		if(holder) {
			this.isHold = 'true';
		} else {
			this.isHold = 'false';
		}
	} catch (error) {
		console.error(error);
	}
},
MetaMaskClientCheck: async function() {
  if (!this.isMetaMaskInstalled()) {
    this.isInstall = 'Please install MetaMask';
  } else {
    this.isInstall = 'Connect';

  }
},


  }
}
</script>
