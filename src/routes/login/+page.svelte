<script lang="ts">
</script>

<div class="min-h-screen">
	<form method="POST" action="?/login" class="h-full flex flex-col items-center justify-center">
		<h1 class="text-4xl font-bold m-5">Login</h1>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input name="email" type="email" class="input input-bordered w-full max-w-xs" />
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input name="password" type="password" class="input input-bordered w-full max-w-xs" />
		</div>

		<button class="btn btn-wide m-10">Login</button>
	</form>
</div>
