<template>
  <div>
    <!-- 菜单部分 -->
    <nav class="menu">
        <input class="menu-toggler" id="menu-toggler" type="checkbox">
        <label for="menu-toggler"></label>
        <ul>
            <li class="menu-item">
                <a class="fa fa-weibo" href="javascript:void(0)"></a>
            </li>
            <li class="menu-item">
                <a class="fa fa-youtube" href="javascript:void(0)"></a>
            </li>
            <li class="menu-item">
                <a class="fa fa-wordpress" href="javascript:void(0)"></a>
            </li>
            <li class="menu-item">
                <a class="fa fa-qq" href="javascript:void(0)"></a>
            </li>
            <li class="menu-item">
                <a class="fa fa-weixin" href="javascript:void(0)"></a>
            </li>
            <li class="menu-item">
                <a class="fa fa-github" href="javascript:void(0)"></a>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css';

body {
    overflow: hidden;
    background: linear-gradient(to right, #ffb95e, #f35c70);
}

.menu {
    position: relative;
    height: 800px;
    background: linear-gradient(to right, #ffb95e, #f35c70);
}

.menu-toggler {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
    background: #999;
}

.menu-toggler:hover + label, .menu-toggler:hover + label:before, .menu-toggler:hover + label:after {
    background: #999;
}

.menu-toggler:checked + label {
    background: transparent;
}

.menu-toggler:checked + label:before, .menu-toggler:checked + label:after {
    top: 0;
    width: 40px;
    transform-origin: 50% 50%;
}

.menu-toggler:checked + label:before {
    transform: rotate(45deg);
}

.menu-toggler:checked + label:after {
    transform: rotate(-45deg);
}

.menu-toggler:checked ~ ul .menu-item {
    opacity: 1;
}

.menu-toggler:checked ~ ul .menu-item:nth-child(1) {
    transform: rotate(0deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(2) {
    transform: rotate(60deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(3) {
    transform: rotate(120deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(4) {
    transform: rotate(180deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(5) {
    transform: rotate(240deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(6) {
    transform: rotate(300deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item a {
    pointer-events: auto;
}

.menu-toggler + label {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

.menu-toggler + label:before, .menu-toggler + label:after {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    content: "";
    position: absolute;
    left: 0;
}

.menu-toggler + label:before {
    top: 10px;
}

.menu-toggler + label:after {
    top: -10px;
}

.menu-item:nth-child(1) a {
    transform: rotate(0deg);
}

.menu-item:nth-child(2) a {
    transform: rotate(-60deg);
}

.menu-item:nth-child(3) a {
    transform: rotate(-120deg);
}

.menu-item:nth-child(4) a {
    transform: rotate(-180deg);
}

.menu-item:nth-child(5) a {
    transform: rotate(-240deg);
}

.menu-item:nth-child(6) a {
    transform: rotate(-300deg);
}


.menu-item {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: 0.5s;
}

.menu-item a {
    display: block;
    width: inherit;
    height: inherit;
    line-height: 80px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-align: center;
    text-decoration: none;
    font-size: 40px;
    pointer-events: none;
    transition: 0.2s;
}

.menu-item a:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    color: #666;
    background: rgba(255, 255, 255, 0.3);
    font-size: 44.44px;
}
</style>