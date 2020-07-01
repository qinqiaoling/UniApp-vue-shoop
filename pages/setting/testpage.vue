<template>
	<view class="testpage">
		<!-- th -->
		<view style="display: flex;">
			<view style="width: 160px;overflow: hidden;">
				<scroll-view
					class="vhm1"
					scroll-with-animation>
					<view class="vmdisflex">
						<view 
							class="vmflexv" 
							v-for="i in 1" 
							:key="i">
							标题 {{i}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view :style="'width:' +sysw +'px'">
				<scroll-view
					scroll-x="true" 
					:scroll-left="scrolleft"
					show-scrollbar="true" 
					class="vhm1"
					scroll-with-animation
					@scroll="scrollth">
					<view class="vmdisflex">
						<view 
							class="vmflexv" 
							v-for="i in 4" 
							:key="i">
							标题 {{i+1}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- td内容 -->
		<view style="display: flex;">
			<view style="width: 160px;">
				<view class="vb">
					<scroll-view
						scroll-y="true"
						:scroll-top="scrollTop"
						show-scrollbar="true" 
						class="scroll-Y" 
						scroll-with-animation
						@scroll="scrolltdl">
						<view class="vbdisflex">
							<view 
								class="vbflexv" 
								v-for="i in 15" 
								:key="i">
								item {{i}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view :style="'width:' +sysw +'px'">
				<view class="wh" :style="'width:' +sysw +'px'">
					<scroll-view 
						scroll-x="true" 
						scroll-y="true"
						:scroll-left="scrolleft"
						:scroll-top="scrollTop"
						show-scrollbar="true" 
						class="scroll-Y" 
						scroll-with-animation
						@scroll="scrolltdr">
						<view class="disflex">
							<view 
								class="flexv" 
								v-for="i in 60" 
								:key="i">
								item-{{i}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		
		<view class="example">
			<view class="title">固定一列和固定高度</view>
			<view class="table">
				<z-table 
					:textAlign="selectContent[nowType].textAlign" 
					:titleTextAlign="selectContent[nowType].titleTextAlign" 
					:tableData="nowData" 
					:columns="nowColumn" 
					@onSort="doSort" 
					:stickSide="selectContent[nowType].stickSide" 
					:showBottomSum="selectContent[nowType].showBottomSum" 
					:showLoading="false" 
					:emptyText='selectContent[nowType].emptyText'
					:tableHeight='selectContent[nowType].tableHeight' 
					@onClick="rowClick" 
					:singleSelect="singleSelect" 
					:showSelect="selectContent[nowType].showSelect" 
					@onSelect="tableSelect"></z-table>
			</view>
			<button v-if="selectContent[nowType].showSelect" class="select-btn" type="primary" @click="singleSelect = !singleSelect">{{ !singleSelect ? '开启单选' : '开启多选' }}</button>
			<view class="example-title">code:</view>
			<scroll-view scroll-x class="codes">
				<text space="ensp">
					html代码:
					{{nowHtml}}
					
					js代码:
					tableData: {{ JSON.stringify(nowData).replace(/(\,)/g, `$1\n    			`).replace(/(\})/g, '\n$1').replace(/(\{)/g, '\n$1\n    			') }},
					
					columns: {{ JSON.stringify(nowColumn).replace(/(\,)/g, `$1\n    			`).replace(/(\})/g, '\n$1').replace(/(\{)/g, '\n$1\n    			') }}
				</text>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import zTable from "@/components/common/z-table/z-table.vue";
	export default {
		components:{zTable},
	    data() {
	        return {
	            scrollTop: 0,
				scrolleft:0,
				sysw:200,
				showUpData: false,
				nowType: 0,
				nowData: false,
				nowColumn: false,
				nowHtml: '',
				myDebounce: this.debounce(this.setTable),
				selectContent: [
					{
						id: 'f0',
						name: '开启所有的功能', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'finaleTableData', // 表格数据
						columns: 'finaleColumns', // 表格列内容
						stickSide: true, // 左侧固定
						showBottomSum: true, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: 500, // 表格高度
						showSelect: true ,// 开启选择功能
						html: 'finaleHtml'
					},
					{
						id: 'f1',
						name: '基础使用示例', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'baseTableData', // 表格数据
						columns: 'baseColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'baseHtml'
					},
					{
						id: 'f2',
						name: '左侧固定', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'stickSideTableData', // 表格数据
						columns: 'stickSideColumns', // 表格列内容
						stickSide: true, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'stickSideHtml'
					},
					{
						id: 'f3',
						name: '显示底部统计', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'showBottomSumTableData', // 表格数据
						columns: 'showBottomSumColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: true, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'showBottomSumHtml'
					},
					{
						id: 'f4',
						name: '自定义内容', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'customTableData', // 表格数据
						columns: 'customColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'customHtml'
					},
					{
						id: 'f5',
						name: '单元格内容为链接', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'isLinkTableData', // 表格数据
						columns: 'isLinkColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'isLinkHtml'
					},
					{
						id: 'f6',
						name: '自定义判空显示内容', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'emptyTableData', // 表格数据
						columns: 'emptyColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'emptyHtml'
					},
					{
						id: 'f7',
						name: '自定义高度', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'heightTableData', // 表格数据
						columns: 'heightColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: 200, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'alignHtml'
					},
					{
						id: 'f8',
						name: '开启排序', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'sortTableData', // 表格数据
						columns: 'sortColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'sortHtml'
					},
					{
						id: 'f9',
						name: '开启选择', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'selectData', // 表格数据
						columns: 'selectColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: true ,// 开启选择功能
						html: 'selectHtml'
					},
					{
						id: 'f10',
						name: '开启点击事件', // 功能名
						textAlign: '', // 内容对齐方式
						titleTextAlign: '', // 表头对齐方式
						tableData: 'clickData', // 表格数据
						columns: 'clickColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'clickHtml'
					},
					{
						id: 'f11',
						name: '设置对齐方式', // 功能名
						textAlign: 'center', // 内容对齐方式
						titleTextAlign: 'center', // 表头对齐方式
						tableData: 'alignTableData', // 表格数据
						columns: 'alignColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'alignHtml'
					},
					{
						id: 'f12',
						name: '自定义表头内容（只能定义样式）', // 功能名
						textAlign: 'center', // 内容对齐方式
						titleTextAlign: 'center', // 表头对齐方式
						tableData: 'customTitleTableData', // 表格数据
						columns: 'customTitleColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'customTitleHtml'
					},
					{
						id: 'f13',
						name: '多表头功能', // 功能名
						textAlign: 'center', // 内容对齐方式
						titleTextAlign: 'center', // 表头对齐方式
						tableData: 'multipleTitleTableData', // 表格数据
						columns: 'multipleTitleColumns', // 表格列内容
						stickSide: false, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '设置了showLoading=false才会看到我', // 表格内容为空时显示的内容
						tableHeight: false, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'customTitleHtml'
					}
				],
				baseTableData: [
					{
						name: "张三",
						age: 18,
						gender: ''
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				baseColumns: [{
						title: "姓名",
						key: "name",
						width: 100
					},
					{
						title: "性别",
						key: "gender",
						width: 400
					},
					{
						title: "年龄",
						key: "age",
						width: 400
					}
				],
				baseHtml: "<z-table :tableData='baseTableData' :columns='baseColumns'></z-table>",
				// 固定左侧
				stickSideTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					}, {
						name: "赵四",
						age: 16,
						gender: "女"
					}, {
						name: "王五",
						age: 20,
						gender: "男"
					}, {
						name: "李六",
						age: 18,
						gender: "女"
					},{
						name: "赵四",
						age: 16,
						gender: "女"
					}, {
						name: "王五",
						age: 20,
						gender: "男"
					}, {
						name: "李六",
						age: 18,
						gender: "女"
					},
				],
				stickSideColumns: [
					{
						title: "姓名",
						key: "name",
						width: 100
					}, {
						title: "性别",
						key: "gender",
						width: 400
					}, {
						title: "年龄",
						key: "age",
						width: 400
					},{
						title: "性别",
						key: "gender",
						width: 400
					}, {
						title: "年龄",
						key: "age",
						width: 400
					},
				],
				stickSideHtml: "<z-table :tableData='stickSideTableData' :columns='stickSideColumns' stickSide='true'></z-table>",
				// 底部统计表格
				showBottomSumTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					}, {
						name: "赵四",
						age: 16,
						gender: "女"
					}, {
						name: "王五",
						age: 20,
						gender: "男"
					}, {
						name: "李六",
						age: 18,
						gender: "女"
					},
				],
				showBottomSumColumns: [
					{
						title: "姓名",
						key: "name",
						width: 100
					}, {
						title: "性别",
						key: "gender",
						width: 400
					}, {
						title: "年龄",
						key: "age",
						width: 400
					},
				],
				showBottomSumHtml: "<z-table :tableData='showBottomSumTableData' :columns='showBottomSumColumns' showBottomSum='true'></z-table>",
				// 自定义内容的表格
				customTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					}, {
						name: "赵四",
						age: 16,
						gender: "女"
					}, {
						name: "王五",
						age: 20,
						gender: "男"
					}, {
						name: "李六",
						age: 18,
						gender: "女"
					},
				],
				customColumns: [
					{
						title: "姓名",
						format: {
							template: "我叫 #name#",
							names: ["name"]
						},
						width: 200
					}, {
						title: "性别",
						key: "gender",
						width: 400
					}, {
						title: "年龄",
						key: "age",
						width: 400
					},
				],
				customHtml: "<z-table :tableData='customTableData' :columns='customColumns'></z-table>",
				// 单元格为链接
				isLinkTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				isLinkColumns: [
					{
						title: "姓名",
						key: "name",
						isLink: {
							url: "https://www.baidu.com",
							params: ["from|name"]
						},
						width: 100
					},
					{
						title: "性别",
						key: "gender",
						width: 400
					},
					{
						title: "年龄",
						key: "age",
						width: 400
					}
				],
				isLinkHtml: "<z-table :tableData='isLinkTableData' :columns='isLinkColumns'></z-table>",
				// 空字符串
				emptyTableData: [],
				emptyColumns: [
					{
						title: "姓名",
						key: "name",
						width: 100
					},
					{
						title: "性别",
						key: "gender",
						width: 400
					},
					{
						title: "年龄",
						key: "age",
						width: 400
					}
				],
				emptyHtml: "<z-table :tableData='emptyTableData' :columns='emptyColumns' :showLoading='false' emptyText='设置了showLoading=false才会看到我'></z-table>",
				// 自定义高度
				heightTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				heightColumns: [
					{
						title: "姓名",
						key: "name",
						width: 100
					},
					{
						title: "性别",
						key: "gender",
						width: 400
					},
					{
						title: "年龄",
						key: "age",
						width: 400
					}
				],
				heightHtml: "<z-table :tableData='heightTableData' :columns='heightColumns' :tableHeight='192'></z-table>",
				// 开启排序
				sortTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				sortColumns: [
					{
						title: "姓名",
						key: "name",
						width: 100
					},
					{
						title: "性别",
						key: "gender",
						sort: true,
						width: 400
					},
					{
						title: "年龄",
						key: "age",
						sort: true,
						width: 400
					}
				],
				sortHtml: "<z-table :tableData='sortTableData' :columns='sortColumns' @sort='doSort'></z-table>",
				finaleTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					},
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					},
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				finaleColumns: [
					{
						title: '<span style="color: #333"><span style="display: inline-block; width: 10px; height: 10px; line-height: 10px; margin-right: 5px; border: solid 1px #000; border-radius: 50%; font-size: 11px; text-align: center; vertical-align: middle;">!</span><span st yle="vertical-align: middle;">姓名</span></span>',
						format: {
							template: "<span><img src='/static/location.png' style='width: 20px;height: 20px; margin-right: 5px; border-radius: 50%;vertical-align: middle;'/><span style='vertical-align: middle;'>我叫 #name#</span>",
							names: ["name"]
						},
						isLink: {
							url: "https://www.baidu.com",
							params: ["from|name"]
						},
						width: 300
					},
					{
						title: "性别",
						key: "gender",
						sort: true,
						width: 400,
						listenerClick: true
					},
					{
						title: "年龄",
						key: "age",
						sort: true,
						width: 400
					}
				],
				finaleHtml: "<z-table :tableData='finaleTableData' :columns='finaleColumns' stickSide showBottomSum emptyText='设置了showLoading=false才会看到我' :tableHeight='600' showSelect @onClick='rowClick' @onSelect='tableSelect' @onSort='doSort' ></z-table>",
				singleSelect: false,
				selectData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				selectColumns: [
					{
						title: "姓名",
						key: 'name',
						width: 300
					},
					{
						title: "性别",
						key: "gender",
						width: 300
					},
					{
						title: "年龄",
						key: "age",
						width: 300
					}
				],
				selectHtml: "<z-table showSelect :singleSelect='singleSelect' :tableData='selectData' :columns='selectColumns' @onSelect='tableSelect'></z-table>",
				clickData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				clickColumns: [
					{
						title: "姓名",
						key: 'name',
						width: 300
					},
					{
						title: "性别",
						key: "gender",
						width: 300,
						listenerClick: true
					},
					{
						title: "年龄",
						key: "age",
						width: 300
					}
				],
				clickHtml: "<z-table :tableData='selectData' :columns='selectColumns' @onClick='rowClick'></z-table>",
				alignTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				alignColumns: [
					{
						title: "姓名",
						key: 'name',
						width: 200
					},
					{
						title: '性别',
						key: "gender",
						width: 400,
					},
					{
						title: "年龄",
						key: "age",
						width: 400
					}
				],
				alignHtml: "<z-table :tableData='alignTableData' :columns='alignColumns'></z-table>",
				customTitleTableData: [
					{
						name: "张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				customTitleColumns: [
					{
						title: '<span style="color: #333"><span style="display: inline-block; width: 10px; height: 10px; line-height: 10px; margin-right: 5px; border: solid 1px #000; border-radius: 50%; font-size: 11px; text-align: center; vertical-align: middle;">!</span><span st yle="vertical-align: middle;">姓名</span></span>',
						key: 'name',
						width: 200
					},
					{
						title: '<span style="color: red">性别</span>',
						key: "gender",
						width: 400,
					},
					{
						title: '<span style="color: blue">年龄</span>',
						key: "age",
						width: 400
					}
				],
				customTitleHtml: "<z-table :tableData='customTitleTableData' :columns='customTitleColumns'></z-table>",
				multipleTitleTableData: [
					{
						name: "张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三,张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三",
						age: 18,
						gender: "男"
					},
					{
						name: "赵四",
						age: 16,
						gender: "女"
					},
					{
						name: "王五",
						age: 20,
						gender: "男"
					},
					{
						name: "李六",
						age: 18,
						gender: "女"
					}
				],
				multipleTitleColumns: [
					{
						title: '<span style="color: #333"><span style="display: inline-block; width: 10px; height: 10px; line-height: 10px; margin-right: 5px; border: solid 1px #000; border-radius: 50%; font-size: 11px; text-align: center; vertical-align: middle;">!</span><span st yle="vertical-align: middle;">姓名</span></span>',
						key: 'name',
						width: 200
					},
					{
						title: '<span style="color: red">性别</span>',
						key: "gender",
						width: 400,
					},
					{
						title: '<span style="color: blue">年龄</span>',
						key: "age",
						width: 400
					}
				],
				multipleTitleHtml: "<z-table :tableData='multipleTitleTableData' :columns='multipleTitleColumns'></z-table>"
	        }
	    },
		watch: {
			nowType: {
				handler() {
					this.nowData = false
					this.nowColumn = false
					this.myDebounce()
				},
				immediate: true
			}
		},
		onLoad() {
			this.sysw = uni.getSystemInfoSync().screenWidth - 160
		},
		onShow() {
			let temp = new Array(100)
			// 性能测试 100条自定义内容带头像
			for (let i of temp) {
				console.log(i)
				this.finaleTableData.push({
						name: "王五",
						age: 20,
						gender: "男"
					})
			}
			console.log(this.finaleTableData)
		},
	    methods: {
			changeType(index) {
				if (this.nowType === index) return
				this.nowType = index
			},
			setTable() {
				this.nowData = this.$data[this.selectContent[this.nowType].tableData]
				this.nowColumn = this.$data[this.selectContent[this.nowType].columns]
				this.nowHtml = this.$data[this.selectContent[this.nowType].html]
				console.log(this.nowHtml)
			},
			debounce(fn, time = 1000) {
				let timer = null
				return function() {
					if (timer) clearTimeout(timer)
					timer = setTimeout(fn, time)
				}
			},
			doSort(res) {
				uni.showToast({
					title: `点击了${res.key}的排序, 排序方式为${res.type}`,
					icon: "none"
				})
			},
			rowClick(item) {
				uni.showToast({
					title: `${JSON.stringify(item)}数据被点击`,
					icon: 'none'
				})
			},
			tableSelect(selectList) {
				uni.showToast({
					title: `选中了TableData中下标为${selectList.join(',')}的元素`,
					icon: 'none'
				})
			},
	        scrollth: function(e) {
				console.log(e,'距离顶部距离',e.detail.scrollTop,'距离左边距离',e.detail.scrollLeft)
				this.scrolleft = e.detail.scrollLeft
	        },
			scrolltdl: function(e) {
				console.log(e,'距离顶部距离',e.detail.scrollTop,'距离左边距离',e.detail.scrollLeft)
				this.scrollTop = e.detail.scrollTop
			},
			scrolltdr: function(e) {
				console.log(e,'距离顶部距离',e.detail.scrollTop,'距离左边距离',e.detail.scrollLeft)
				this.scrolleft = e.detail.scrollLeft
				this.scrollTop = e.detail.scrollTop
			},
	    }
	}
</script>

<style lang="scss">
	.testpage{
		.vhm1{
			white-space: nowrap;
			width: 100%;
		}
		.vmdisflex{
			display: flex;
			// width: 800px;
			width: 640px;
			border-bottom: 1px solid #000000;
			box-sizing: border-box;
			// padding-left: 160px;
		}
		.vmflexv{
			width: 160px;
			box-sizing: border-box;
			border-right: 1px solid #000000;
			border-bottom: 1px solid #000000;
			height: 30px;
			background: #FFFFFF;
			// &:first-child{
			// 	position: fixed;
			// 	left: 0;
			// }
		}
		.wh{
			float: right;
		}
		.vb{
			width: 160px;
			float: left;
			.vbdisflex{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				position: relative;
				.vbflexv{
					width: 160px;
					box-sizing: border-box;
					border: 1px solid #000000;
					height: 30px;
				}
			}
		}
		.scroll-Y {
			height: 200px;
		}
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}
		.disflex{
			display: flex;
			flex-wrap: wrap;
			width: 640px;
			position: relative;
			.flexv{
				width: 160px;
				box-sizing: border-box;
				border: 1px solid #000000;
				height: 30px;
			}
		}
		.codes {
			padding: 20rpx;
			background: #333;
			color: #fff;
			box-sizing: border-box;
		}
		
		.codes text {
			white-space: nowrap;
		}
		
	}
</style>
