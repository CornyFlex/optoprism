<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" style="font-size: 20px;">
            <b-navbar-brand href="#">OptoPrism</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">About</b-nav-item>
                <b-nav-item href="#" disabled>Gallery</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="md" class="mr-sm-2" placeholder="Search city"></b-form-input>
                <b-button size="md" class="my-2 my-sm-0" type="submit" variant="danger">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
</style>