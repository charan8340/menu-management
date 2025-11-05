const express = require('express');
require('dotenv').config();

const { syncDB } = require('./src/models');
const app = express();
app.use(express.json());

const categoryRoutes = require('./src/routes/categoryRoutes');
const subcategoryRoutes = require('./src/routes/subcategoryRoutes');
const itemRoutes = require('./src/routes/itemRoutes');

app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/items', itemRoutes);

// Also add a route for /api/category/:cid/sub_cat/:scid to call itemController directly
const itemService = require('./src/services/itemService');
app.get('/api/category/:cid/sub_cat/:scid', itemService.getItemsByCategoryAndSubcategory);

const PORT = process.env.PORT || 3000;
syncDB({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
