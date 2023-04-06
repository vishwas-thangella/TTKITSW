import { createSlice, configureStore } from '@reduxjs/toolkit';

const Slice = createSlice({
    name:"slice",
    initialState:{
        Drawer:false,
    },
    reducers:{
        setDrawer(state,actions){
            state.Drawer = actions.payload
        }
    }
});

const Store = configureStore({reducer:Slice.reducer});
const Actions = Slice.actions;

export { Store,Actions };