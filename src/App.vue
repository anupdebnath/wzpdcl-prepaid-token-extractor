<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-8 py-16 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold mb-4">WZPDCL Prepaid Token Extractor</h1>
      <p class="text-gray-700 mb-6">Beautify WZPDCL Prepaid Token SMS.</p>
      <div class="mb-6">
        <textarea
          id="message"
          v-model="tokenMessage"
          class="w-full mt-1 p-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          rows="4"
          placeholder="Enter your message here..."
        ></textarea>
      </div>

      <div class="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          class="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          @click="extractInformation"
        >
          Beautify
        </button>
      </div>

      <!-- Display extracted token data -->
      <div v-if="Object.keys(tokenData).length > 0" class="mt-8">
        <h2 class="text-xl font-bold mb-4">Token Information</h2>

        <!-- <pre class="whitespace-pre-wrap">{{ tokenData }}</pre> -->
        <p>
          WZPDCL Prepaid Token: <pre>{{ tokenData.prepaidtoken }}</pre> <br />
          Sequence Number: {{ tokenData.sequencenumber }} <br />
          Meter Number: {{ tokenData.meternumber }}<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      tokenMessage: '',
      tokenData: {} as Record<string, string>
    }
  },
  computed: {
    tokenDataJson(): string {
      return JSON.stringify(this.tokenData, null, 2)
    }
  },
  methods: {
    extractInformation() {
      const regexPatterns = {
        prepaidtoken: /Token is ((?:\d{4}-\d{4}-\d{4}-\d{4}-\d{4},?)+)/,
        sequencenumber: /SeqNo:(\d+=?\d*)/,
        meternumber: /for Meter No:(\d+)/,
        vendingamount: /Vending Amt:(\d+\.\d+)/,
        energycost: /Enrg Cost(\d+\.\d+)/,
        totalcharge: /Total Charge:(\d+\.\d+)/,
        meterrent: /Meter Rent 1P:(\d+)/,
        demandcharge: /Demand Charge:(\d+)/,
        vat: /VAT:(\d+\.\d+)/,
        rebate: /Rebate:(-\d+\.\d+)/
      }
      for (const [key, regex] of Object.entries(regexPatterns)) {
        const match = this.tokenMessage.match(regex)
        if (match) {
          this.tokenData[key] = match[1]
        }
      }
      this.tokenData['prepaidtoken'] = this.tokenData['prepaidtoken'].replace(/,/g, '\n')
    }
  }
})
</script>
