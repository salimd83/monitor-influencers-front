const MockAdapter = require("axios-mock-adapter")
const axiosa      = require("axios")
const mock        = new MockAdapter(axiosa)
export default mock