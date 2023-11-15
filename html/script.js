const boilerApp = Vue.createApp({
    data() {
        // This is where you define your variables used in the HTML
        return {
            inputValue: "", // this will be bound to the input
            showApp: false, // this will toggle visibility
        };
    },
    computed: {
        // This is where you define fuctions that don't need parameters
        // https://vuejs.org/guide/essentials/computed.html
        computedValue() {
            // Compute and return a value based on the input value
            return this.inputValue.toUpperCase();
        },
    },
    watch: {
        // This is where you can watch for state changes and act on them
        // Think like AddEventHandler in lua except we're listening using v-model
        // https://vuejs.org/guide/essentials/watch.html
        inputValue(newValue, oldValue) {
            console.log(`Input Value Changed: ${oldValue} -> ${newValue}`);
        },
    },
    methods: {
        // This is where your traditional JS functions go
        // https://vuejs.org/guide/essentials/methods.html
        handleKeydown(event) {
            if (event.key === "Escape") {
                this.closeApplication();
            }
        },
        closeApplication() {
            // if you'd rather not use axios, you can use fetch as shown below
            // fetch(`https://${GetParentResourceName()}/closeApp`, { method: "POST", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ inputValue: this.inputValue }) });
            axios.post(`https://${GetParentResourceName()}/closeApp`, { inputValue: this.inputValue });
            this.showApp = false;
            this.inputValue = "";
        },
    },
    mounted() {
        // This is where you will add your event listeners
        // https://vuejs.org/guide/instance.html#Lifecycle-Diagram
        document.addEventListener("keydown", this.handleKeydown);

        window.addEventListener("message", (event) => {
            if (event.data.action === "openApp") {
                this.showApp = true;
            }
        });
    },
    beforeUnmount() {
        // This is where you will remove your event listeners
        // https://vuejs.org/guide/instance.html#Lifecycle-Diagram
        document.removeEventListener("keydown", this.handleKeydown);
    },
}).mount("#app");
