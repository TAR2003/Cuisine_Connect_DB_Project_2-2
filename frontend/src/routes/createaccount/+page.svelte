<script>
	import { goto } from '$app/navigation';
	import Map from './Map.svelte';
	import Cookies from 'js-cookie';
	let userinput = '';
	$: userparam = '@' + userinput;
	let password = '';
	let alertstring = '';
	let Name = '';
	let email = '';
	let mobileno = '';

	async function handleInputChange() {
		if ((await checkunique()) == 'false') {
			alertstring = 'OK, you can have this username';
		} else {
			alertstring = 'Noo you can not have this usernmae';
		}
		if (userinput == '') {
			alertstring = 'Noo you can not have this usernmae';
			return;
		}
	}

	async function checkunique() {
		if (userinput == 'admin') return 0;
		let s = {
			title: 'checkusername',
			username: '@' + userinput
		};
		try {
			const response = await fetch('http://localhost:3001/api/username', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(s)
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			console.error('Error :', error);
		}
	}

	let selectedCoordinates = { lat: 23.8103, lng: 90.4125 }; // Default coordinates

	function handleCoordinatesChange(event) {
		selectedCoordinates = event.detail;
	}

	let options = ['Customer', 'Restaurant', 'Page'];
	let selectedOption = 'Customer';
	let answer = '';
	let datevar = 'Date of Birth :';
	function handleFormChange() {
		if (selectedOption == 'Customer') datevar = 'Date of Birth :';
		else if (selectedOption == 'Restaurant') datevar = 'Date of Opening :';
		else datevar = 'Date of creation :';
	}
	let d = '';

	let profilePicture = null;
	let coverPhoto = null;
	async function uploadData() {
		if (!isReady()) {
			return;
		} else {
			console.log(!isReady());
			const formData = new FormData();
			formData.append('name', Name);
			formData.append('password', password);
			formData.append('username', userparam);
			formData.append('email', email);
			formData.append('mobileno', mobileno);
			formData.append('type', selectedOption[0]);
			formData.append('date', d);
			formData.append('x', selectedCoordinates.lat);
			formData.append('y', selectedCoordinates.lng);
			formData.append('profilePicture', profilePicture);
			formData.append('coverPhoto', coverPhoto);

			try {
				const response = await fetch('http://localhost:3001/save-data', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					console.log('Data uploaded successfully');
				} else {
					console.error('Data upload failed');
				}
			} catch (error) {
				console.error('Error uploading data:', error);
			}
			console.log(!isReady());
			const usertype = selectedOption[0];
			Cookies.set('usertype', usertype);
			Cookies.set('username', '@' + userinput);
			let id1 = await getID(userparam);
			Cookies.set('userid', id1);
			goto('/user');
		}
	}

	async function getID(u) {
		let s = {
			title: 'getid',
			username: u
		};
		try {
			const response = await fetch('http://localhost:3001/api/username', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(s)
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			console.error('Error :', error);
		}
	}
	function isReady() {
		if (alertstring[0] == 'N') return false;
		if (Name == '') return false;
		if (email == '') return false;
		if (userinput == '') return false;
		if (password == '') return false;
		if (mobileno == '') return false;
		if (mobileno.length < 1) return false;
		if (d == '') return false;
		if (!profilePicture) return false;
		if (!coverPhoto) return false;
		else return true;
	}
</script>

<div class="topbar">
	<div class="leftdiv"><a href="/"><p class="docs">Docs</p></a></div>
	<div class="centerdiv">
		<img
			src="src/public/images/CuisineConnectLOGO.png"
			class="thelogo"
			alt="loading image failed"
		/>
		<p class="titleblock">Where Food Lovers and<br /> Restaurants Connect!</p>
	</div>
	<div class="rightdiv">
		<div class="login">
			<a href="/login"><p class="logintext">Log in</p></a>
		</div>
		<div class="signup">
			<a href="/createaccount"><p class="signuptext">Sign up</p></a>
		</div>
	</div>
</div>

<h1 class="titlebar">Create an account</h1>
<div class="topcontainer">
	<div class="username">
		<div class="promptdiv"><p class="usernameprompt">Enter username :</p></div>
		<div class="at"><p>@</p></div>
		<input
			class="usernamebox"
			type="text"
			bind:value={userinput}
			placeholder="enter unique username"
			on:input={handleInputChange}
		/>
	</div>
	<div class="password">
		<div class="promptdiv"><p class="usernameprompt">Enter password :</p></div>
		<div class="at"><p /></div>
		<input class="usernamebox" type="password" bind:value={password} />
	</div>
	{#if alertstring == 'OK, you can have this username'}
		<p class="dontalert">{alertstring}</p>
	{:else}
		<p class="alert">{alertstring}</p>
	{/if}
</div>

<div class="topcontainer">
	<div class="username">
		<div class="promptdiv"><p class="usernameprompt">Enter Name :</p></div>
		<div class="at"><p /></div>
		<input class="usernamebox" type="text" bind:value={Name} placeholder="enter your Name" />
	</div>
	<div class="password">
		<div class="promptdiv"><p class="usernameprompt">Enter email :</p></div>
		<div class="at"><p /></div>
		<input class="usernamebox" type="text" bind:value={email} />
	</div>
</div>

<div class="super">
	<div class="leftclass">
		<div class="mobilediv">
			<p class="entermobile">Enter your Number :</p>
			<input
				type="number"
				class="takemobile"
				bind:value={mobileno}
				placeholder="Please Enter all 11 digits"
			/>
		</div>
		<div class="form">
			<p class="typetext">You are a :</p>
			<form class="classicform" on:submit={handleInputChange}>
				<select class="editform" bind:value={selectedOption} on:change={handleFormChange}>
					{#each options as option}
						<option value={option}>
							{option}
						</option>
					{/each}
				</select>
			</form>
		</div>
		<div class="datediv">
			<p class="enterdate">{datevar}</p>
			<input class="dateclass" type="date" bind:value={d} />
		</div>
	</div>
	<div class="mapcontainer">
		<Map on:coordinatesChanged={handleCoordinatesChange} />
	</div>
</div>

<label class="file-input-label">
	<span>Upload Profile Picture</span>
	<input class="pic" type="file" on:change={(e) => (profilePicture = e.target.files[0])} />
</label>
<label class="file-input-label">
	<span>Upload Cover Photo</span>
	<input class="pic" type="file" on:change={(e) => (coverPhoto = e.target.files[0])} />
</label>

<button class="submit" on:click={uploadData}>Submit</button>

<style>
	.pic {
		font-size: 20px;
	}
	.file-input-label {
		font-size: 30px;
		margin-left: 20px;
	}
	.submit {
		width: 200px;
		height: 50px;
		margin-left: 100px;
		font-size: 40px;
		margin-top: 20px;
		background-color: rgb(0, 0, 0);
		color: white;
		border: 1px solid white;
	}
	.submit:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
	.super {
		margin-bottom: 20px;
	}
	.datediv {
		display: flex;
		flex: 1;
	}
	.enterdate {
		margin-left: 120px;
		font-size: 20px;
		display: inline-block;
	}
	.dateclass {
		font-size: 20px;
		display: inline-block;
		width: 600px;
		height: 30px;
		justify-content: center;
		text-align: center;
		margin-top: 20px;
		margin-left: 60px;
	}
	.editform {
		width: 600px;
		height: 40px;
		text-align: center;
		font-size: 20px;
	}
	.typetext {
		display: inline-block;
		margin-top: 30px;
		font-size: 20px;
		margin-left: 155px;
	}
	.classicform {
		display: inline-block;

		margin-top: 23px;
		margin-left: 60px;
		font-size: 20px;
	}
	.takemobile {
		display: inline-block;
		width: 600px;
		height: 30px;
		margin-top: 23px;
		margin-left: 60px;
		font-size: 20px;
	}
	.entermobile {
		display: inline-block;
		margin-top: 30px;
		font-size: 20px;
		margin-left: 70px;
	}
	.mobilediv {
		display: flex;
		flex-direction: row, column;
	}
	.form {
	}
	.mobilediv,
	.form,
	.date {
		height: 100px;
		margin: 0%;
		display: flex;
	}

	.super {
		height: 300px;
		width: 1900px;
		display: flex;
		flex: 1;
	}
	.leftclass,
	.mapcontainer {
		height: 300px;
		width: 950px;
		display: inline-block;
	}
	.mapcontainer {
		text-align: center;
		justify-content: right;
	}
	.alert {
		width: 830px;
		padding: 0%;
		margin: 0%;
		color: rgb(255, 12, 12);
	}
	.dontalert {
		width: 830px;
		padding: 0%;
		margin: 0%;
		color: rgb(69, 230, 69);
	}
	.topcontainer {
		height: 50px;
		padding-bottom: 30px;
		text-align: center;
	}
	.at {
		display: inline-block;
		width: 50px;
	}
	.at p {
		font-size: 20px;
		text-align: right;
	}
	.promptdiv {
		width: 200px;
		height: 90px;
		display: inline-block;
		text-align: right;
	}
	.usernamebox {
		display: inline-block;
		height: 30px;
		width: 600px;
		font-size: 20px;
	}
	.username,
	.password {
		height: 60px;
		width: 940px;
		display: inline-block;
		margin-bottom: 0%;
	}
	.usernameprompt {
		font-size: 20px;
	}
	.titlebar {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 60px;
		text-align: center;
		padding-top: 0%;
		margin-top: 0px;
	}
	a {
		color: rgb(209, 178, 7);
	}
	.topbar {
		height: 230px;
		background-color: rgba(54, 54, 55, 0.513);
		display: flex;
		flex-direction: column, row;
		flex: 1;
		background-color: 1;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeAndSlide 1s ease-out forwards;
	}
	.thelogo {
		margin: 0%;
		padding-top: 0%;
	}
	.leftdiv {
		width: 300px;
		text-align: center;
		justify-content: center;
	}
	.centerdiv {
		width: 1100px;
		height: 100%;
		align-self: center;
		text-align: center;
		justify-content: center;
		display: flex;
		flex: 1;
		flex-direction: row, column;
	}
	.rightdiv {
		width: 500px;
		text-align: center;
		justify-content: center;
	}
	.titleblock {
		font: bolder;
		font-size: 60px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		text-align: center;
		padding-top: 40px;
		padding-bottom: 10px;
		margin: 0%;
		color: rgb(209, 178, 7);
	}

	.docs {
		color: rgb(209, 178, 7);
		font-size: 40px;
		padding-top: 40px;
	}
	.login,
	.signup {
		width: 245px;
		height: 100%;
		text-align: center;
		justify-content: center;
		margin: 0px;
		padding: 0%;
		top: 0;
		display: inline-block;
	}
	.signup {
		position: relative;
		right: 0;
	}
	.login {
		left: 0;
	}
	.logintext,
	.signuptext {
		font-size: 50px;
		color: rgb(209, 178, 7);
		padding-top: 20px;
	}
	.headline {
		text-align: center;
		font-size: 80px;
	}

	@keyframes fadeAndSlide {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
