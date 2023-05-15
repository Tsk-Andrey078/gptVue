<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<header>
		<nav class="navbar navbar-expand-lg bg-body-tertiary navmain">
			<div class="container-fluid">
				<a class="navbar-brand">GP4US</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<RouterLink class="nav-link" to="/">Обобщение</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" to="/text-analyze">Анализ новости</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>

	<RouterView />
</template>

<style>

.navmain {
  	background-color:lightgreen;
}
.nav-item {
	margin-left: 20px;
}

</style>
