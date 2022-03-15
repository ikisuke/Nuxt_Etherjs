import { ethers } from 'ethers';
import Vue from 'vue';

Vue.use(ethers);

Vue.prototype.ethers = ethers;
Object.defineProperties(Vue.prototype, {
    $ethers: {
       get() {
        return ethers;
       },
       configurable: true,
    },
 })
