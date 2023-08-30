<script lang="ts">
	import sun from '$lib/assets/sun.svg';
	import moon from '$lib/assets/moon.svg';

	let swapVal = true;
	$: theme = swapVal ? 'black' : 'lofi';
	$: tip = swapVal ? 'Toggle Light' : 'Toggle Dark';
	$: if (typeof document !== 'undefined') {
		document.documentElement.dataset.theme = theme;
	}
</script>

<div class="w-full flex justify-end fixed">
	<div class="tooltip tooltip-bottom mt-2 mr-10 font-light" data-tip={tip}>
		<label class="swap swap-flip text-3xl">
			<!-- this hidden checkbox controls the state -->
			<input type="checkbox" bind:checked={swapVal} />
			<div class="swap-on"><img src={moon} alt="Dark" /></div>
			<div class="swap-off"><img src={sun} alt="Light" /></div>
		</label>
	</div>
</div>
